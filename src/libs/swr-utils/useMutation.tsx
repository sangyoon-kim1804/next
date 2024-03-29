import { Reducer, useCallback, useReducer, useRef } from "react";
import { useMountedState } from "react-use";
import { ApiError } from "@libs/error";
import noop from "lodash-es/noop";

import type { AppAPIResponse, ErrorJSON, SuccessJSON } from "@api/schema/api";
import { RESULT_CODE } from "@constants/constant";

function useSafeCallback<
  Arguments extends Array<any> = any[],
  ReturnValue = any
>(callback: (...args: Arguments) => ReturnValue) {
  const isMounted = useMountedState();
  return useCallback(
    (...args: Arguments) => (isMounted() ? callback(...args) : void 0),
    [callback, isMounted]
  );
}

export type rollbackFn = () => void;

export interface Options<Input, Data, Error> {
  onMutate?(params: {
    input: Input;
  }): Promise<rollbackFn | void> | rollbackFn | void;
  onSuccess?(params: {
    data: SuccessJSON<Data>;
    input: Input;
  }): Promise<void> | void;
  onFailure?(params: {
    error: ErrorJSON<Error>;
    rollback: rollbackFn | void;
    input: Input;
  }): Promise<void> | void;
  onSettled?(
    params:
      | { status: "success"; data: SuccessJSON<Data>; input: Input }
      | {
          status: "failure";
          error: ErrorJSON<Error>;
          rollback: rollbackFn | void;
          input: Input;
        }
  ): Promise<void> | void;
  throwOnFailure?: boolean;
  useErrorBoundary?: boolean;
}

export type Status = "idle" | "running" | "success" | "failure";

function useGetLatest<Value>(value: Value): () => Value {
  const ref = useRef<Value>(value);
  ref.current = value;
  return useCallback(() => ref.current, []);
}

export type Reset = () => void;

export type MutationResult<Input, Data, Error> = [
  (input: Input) => Promise<ErrorJSON<Error> | SuccessJSON<Data> | undefined>,
  {
    status: Status;
    data?: SuccessJSON<Data>;
    error?: ErrorJSON<Error>;
    reset: Reset;
  }
];

export function useMutation<Input = any, Data = any, Error = any>(
  mutationFn: (input: Input) => Promise<AppAPIResponse<Data>>,
  {
    onMutate = () => noop,
    onSuccess = noop,
    onFailure = noop,
    onSettled = noop,
    throwOnFailure = false,
    useErrorBoundary = false,
  }: Options<Input, Data, Error> = {}
): MutationResult<Input, Data, Error> {
  type State = {
    status: Status;
    data?: SuccessJSON<Data>;
    error?: ErrorJSON<Error>;
  };

  type Action =
    | { type: "RESET" }
    | { type: "MUTATE" }
    | { type: "SUCCESS"; data: SuccessJSON<Data> }
    | { type: "FAILURE"; error: ErrorJSON<Error> };

  const [{ status, data, error }, unsafeDispatch] = useReducer<
    Reducer<State, Action>
  >(
    function reducer(_, action) {
      if (action.type === "RESET") {
        return { status: "idle" };
      }
      if (action.type === "MUTATE") {
        return { status: "running" };
      }
      if (action.type === "SUCCESS") {
        return { status: "success", data: action.data };
      }
      if (action.type === "FAILURE") {
        return { status: "failure", error: action.error };
      }
      throw Error("Invalid action");
    },
    { status: "idle" }
  );

  const getMutationFn = useGetLatest(mutationFn);
  const latestMutation = useRef(0);

  const safeDispatch = useSafeCallback(unsafeDispatch);

  const mutate = useCallback(async function mutate(
    input: Input,
    config: Omit<
      Options<Input, Data, Error>,
      "onMutate" | "useErrorBoundary"
    > = {}
  ) {
    const mutation = Date.now();
    latestMutation.current = mutation;

    safeDispatch({ type: "MUTATE" });
    const rollback = (await onMutate({ input })) ?? noop;

    try {
      const getMutation = getMutationFn();
      const result = await getMutation(input);

      const { status, data } = result;
      if (status >= 200 && status < 300) {
        const successJson: SuccessJSON<Data> = {
          type: "SUCCESS" as const,
          message: null,
          ok: true,
          data,
          httpStatus: status,
        };

        if (data.header.resultCode !== RESULT_CODE.OK) {
          throw new ApiError({
            data: result.data,
            status: result.status,
            statusText: result.statusText,
          });
        }

        if (latestMutation.current === mutation) {
          safeDispatch({ type: "SUCCESS", data: successJson });
        }

        await onSuccess({ data: successJson, input });
        await (config.onSuccess ?? noop)({ data, input });

        await onSettled({ status: "success", data: successJson, input });
        await (config.onSettled ?? noop)({ status: "success", data, input });

        return successJson;
      }

      throw new ApiError(result);
    } catch (error) {
      let errorJSON: ErrorJSON<Error>;
      if (ApiError.isApiError(error)) {
        errorJSON = ApiError.toApiErrorJSON<Error>(error);
      } else if (ApiError.isAxiosError(error)) {
        errorJSON = ApiError.toAxioxErrorJSON<Error>(error);
      } else {
        errorJSON = ApiError.toErrorJSON(error);
      }

      await onFailure({ error: errorJSON, rollback, input });
      await (config.onFailure ?? noop)({
        error: errorJSON,
        rollback,
        input,
      });

      await onSettled({
        status: "failure",
        error: errorJSON,
        input,
        rollback,
      });
      await (config.onSettled ?? noop)({
        status: "failure",
        error: errorJSON,
        input,
        rollback,
      });

      if (latestMutation.current === mutation) {
        safeDispatch({ type: "FAILURE", error: errorJSON });
      }

      if (config.throwOnFailure ?? throwOnFailure) throw error;

      return errorJSON;
    }
  },
  []);

  const reset = useCallback(function reset() {
    safeDispatch({ type: "RESET" });
  }, []);

  if (useErrorBoundary && error) throw error;

  return [mutate, { status, data, error, reset }];
}

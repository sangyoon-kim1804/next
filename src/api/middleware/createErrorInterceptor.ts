// constants
import { STATUS_CODE, STORAGE_KEY } from "@constants/constant";
import { isDevelopment } from "@constants/env";
// import { notifyManager } from "@libs/state";

// utils
import { isFunction } from "@utils/assertion";
// import { isBrowser } from "@utils/utils";

// types
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export interface AxiosErrorOptions {
  statusCodes?: Array<number>; // http status과 일치할 경우 refresh token 발급
  shouldErrorBlock?(error: AxiosError): boolean; // status 코드가 아닌 이유로 refresh token 발급이 필요할 경우 (인터셉터를 실행할 여러 상태 코드를 지정 가능)
}

// 해당 함수의 조건에 걸리는 경우에만 refresh token을 발급하고 토큰을 리턴한다.
const shouldInterceptError = (
  error: AxiosError,
  options: AxiosErrorOptions
) => {
  if (!error) {
    return false;
  }

  if (!error.response) {
    return false;
  }

  const { statusCodes = [], shouldErrorBlock = undefined } = options;

  if (isFunction(shouldErrorBlock)) {
    const conditionShouldBlock = shouldErrorBlock(error);
    return conditionShouldBlock;
  }

  return statusCodes.includes(error.response.status);
};

export const createErrorInterceptor = (
  instance: AxiosInstance,
  options: AxiosErrorOptions & {
    shouldUnauthorizedBlock?(error: AxiosError): boolean;
    shouldServerErrorBlock?(error: AxiosError): boolean;
  } = {}
) => {
  const {
    statusCodes = [STATUS_CODE.UNAUTHORIZED],
    shouldUnauthorizedBlock = undefined,
    shouldServerErrorBlock = undefined,
  } = options || {};

  const responseCallback = (response: AxiosResponse) => {
    if (isDevelopment)
      console.log(
        `%c📫 API 응답 수신 주소:${
          response.config.url
        } 유형:${response.config.method?.toUpperCase()} \nAPI상태코드:0`,
        "color: #69db7c;",
        response?.data?.data ?? response?.statusText
      );

    return response;
  };

  return instance.interceptors.response.use(responseCallback, (error: any) => {
    if (isDevelopment && error && error.response && error.response.config)
      console.log(
        `%c🚫 HTTP Error 응답 수신 주소:${
          error.response.config?.url
        } 유형:${error.response.config?.method?.toUpperCase()} \n상태코드:${
          error.response.status
        }`,
        "color: #e03131;",
        error.response.statusText
      );

    if (
      shouldInterceptError(error, {
        statusCodes,
        shouldErrorBlock: shouldUnauthorizedBlock,
      })
    ) {
      // if (isBrowser) {
      //   notifyManager.schedule(() => {
      //     localStorage.removeItem(STORAGE_KEY.TOKEN_KEY);
      //     localStorage.removeItem(STORAGE_KEY.USER_KEY);
      //   });
      // }

      return Promise.reject(error);
    }

    if (
      shouldInterceptError(error, {
        statusCodes: [STATUS_CODE.SERVER_ERROR, STATUS_CODE.BAD_GATEWAY],
        shouldErrorBlock: shouldServerErrorBlock,
      })
    ) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  });
};

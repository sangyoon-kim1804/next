import axios from 'axios';
import { isEmpty, isString, isUndefined } from '@utils/assertion';

import type { AxiosError } from 'axios';
import type {
  AppAPIResponse,
  ErrorAppAPIResponse,
  ErrorJSON,
} from '@api/schema/api';

const Message = () => {
  return {
    alert: {
      common: '오류가 발생했습니다.\n나중에 다시 시도해 주세요.',
      wrong_approach: '잘못된 접근입니다.',
    },
    client_error: {
      email_required: '이메일을 입력해 주세요.',
      email_format: '이메일 형식으로 입력해 주세요.',
      email_already_exists: '이미 사용중인 이메일입니다.',
      password_required: '비밀번호를 입력해 주세요.',
      password_format: '비밀번호는 8자 이상 20자 이하여야 합니다.',
      confirm_password_match: '비밀번호가 일치하지 않습니다.',
      confirm_password_required: '비밀번호 확인을 입력해 주세요.',
      nickname_required: '닉네임을 입력해 주세요.',
      introduction_required: '자기소개를 입력해 주세요.',
      photoSize_format: '사진의 크기는 2MB 이하여야 합니다.',
      photoType_format: '사진의 형식이 올바르지 않습니다.',
    },
    server_error: {
      user_not_exists: '존재하지 않는 사용자입니다.',
      cannot_be_login: '현재 로그인을 할 수 없는 상태입니다.',
      email_already_exists: '이미 사용중인 이메일입니다.',
      email_not_found: '존재하지 않는 이메일입니다.',
      password_wrong: '비밀번호가 일치하지 않습니다.',
    },
  };
};

// @ts-ignore
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? // @ts-ignore
      `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type ErrorMessagePath = NestedKeyOf<ReturnType<typeof Message>>;

class ApiError extends Error {
  constructor(apiError: any, ...args: any[]) {
    super(...args);
    this.name = 'ApiError';
    if (!isEmpty(apiError)) {
      this.message = JSON.stringify(apiError);
    }

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  static isError(error: any): error is Error {
    return error instanceof Error;
  }

  // static isValidationError(error: any): error is ApiError {}

  static isAxiosError(error: any): error is AxiosError<any> {
    return axios.isAxiosError(error);
  }

  static isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
  }

  static getMessage(path?: ErrorMessagePath | null) {
    const message = Message();
    if (!path) {
      return message.alert.common;
    }

    const paths = path.split(/[,[\].]+?/).filter(Boolean);
    // array paths find message object get value
    const result = paths.reduce((acc, cur) => {
      if (isEmpty(cur)) {
        return acc;
      }
      if (isUndefined(acc)) {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/ban-types
      return acc[cur as keyof {}];
    }, message);

    if (!result) {
      return message.alert.common;
    }
    return result as unknown as string;
  }

  static toAxioxErrorJSON<D = any>(error: ErrorAppAPIResponse): ErrorJSON<D> {
    return {
      type: 'ERROR' as const,
      message: ApiError.getMessage('alert.common'),
      ok: false,
      data: error.response?.data,
      httpStatus: error.response?.status,
    };
  }

  static toApiErrorJSON<D = any>(error: ApiError): ErrorJSON<D> {
    let message: AppAPIResponse | undefined = undefined;
    if (isString(error.message)) {
      try {
        message = JSON.parse(error.message);
      } catch (error) {
        message = undefined;
      }
    }

    if (!message) {
      return {
        type: 'API_ERROR' as const,
        message: '',
        ok: false,
        data: undefined,
        httpStatus: 0,
      };
    }

    const {
      data: { header },
    } = message;

    return {
      type: 'API_ERROR' as const,
      message: header.resultCode.toString(),
      ok: false,
      data: message?.data,
      httpStatus: message?.status,
    };
  }

  static toErrorJSON(error: any): ErrorJSON {
    return {
      type: 'ERROR' as const,
      message: ApiError.getMessage('alert.common'),
      ok: false,
      data: error.message,
      httpStatus: null,
    };
  }
}

export default ApiError;

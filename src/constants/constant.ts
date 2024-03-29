export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOED: 405,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,

  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};
export const RESULT_CODE = {
  // 성공
  OK: 0,
  // 실패
  BAD_REQUEST: 400,
  // 찾을 수 없는 상태
  NOT_FOUND: 404,
  // 잘못된 패스워드
  INCORRECT_PASSWORD: 4004,
  // 존재하지 않음
  NOT_EXIST: 2001,
  // 삭제됨
  DELETED: 2002,
  // 이미 존재함
  ALREADY_EXIST: 2003,
  // 유효하지 않음
  INVALID: 2004,
  // 만료된 토큰
  TOKEN_EXPIRED: 4001,
  // 등록 불가
  CANNOT_BE_REGISTERED: 5001,
  // 수정 불가
  CANNOT_BE_CHANGED: 5002,
  // 로그인 할 수 없음
  CANNOT_BE_LOGIN: 5000,
};

export const WEB_APP = "@@digitalIdeaApp";

export const STORAGE_KEY = {
  ACCESS_TOKEN: `${WEB_APP}/accessToken`,
  REFRESH_TOKEN: `${WEB_APP}/refreshToken`,
  EXPIRE_TOKEN: `${WEB_APP}/exp`,
};

export const API_ENDPOINTS = {
  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    REFRESH_TOKEN: "/auth/refreshToken",
  },
  USER: {
    ROOT: "/user",
    CREATE: "/user/create",
    RETRIEVE: "/user/retrieveArtist",
    UPDATE_PASSWORD: "/user/updatePassword",
    INFO: "/user/my",
    ID: (id: string | number) => `/user/${id}`,
  },
  PROJECT: {
    CREATE: "/project/create",
    RETRIEVE: "/project/retrieve",
    STATUS: { ID: (id: string | number) => `/project/status/${id}` },
    ID: (id: string | number) => `/project/${id}`,
  },
  ALERT: {
    ROOT: "/alert",
    ID: (id: string | number) => `/alert/${id}`,
  },
  COMMON_LOG: {
    ROOT: "common-log",
    ID: (id: string | number) => `/common-log/${id}`,
  },
  SHOTGRID: {
    PROJECTS: "/shotgrid/projects",
    USERS: "/shotgrid/users",
    tasks: "/shotgird/tasks",
  },
};

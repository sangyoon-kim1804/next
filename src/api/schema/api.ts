import type { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next";

// ================== Common =================== //

export interface Schema<DataModel = any> {
  header: {
    resultCode: number;
    resultMessage: string;
  };
  data: DataModel;
  errorData: any;
}

export interface ErrorSchema<DataModel = any> {
  message: string;
  ok: boolean;
  data: DataModel | undefined;
  httpStatus: number | undefined;
}

export type AppAPI<Data = any> = Schema<Data>;

export type ErrorAppAPI<Error = any> = ErrorSchema<Error>;

export type AppAPIResponse<Data = any> = AxiosResponse<AppAPI<Data>>;

export type ErrorAppAPIResponse<Error = any> = AxiosError<ErrorAppAPI<Error>>;

export interface Options<Data = any> {
  fallbackData?: Data | null;
  context?:
    | GetStaticPropsContext
    | GetServerSidePropsContext
    | GetStaticPathsContext
    | null;
  enable?: boolean | null;
  withAuthorization?: boolean;
}

export type UploadType = "ETC" | "NFT_IMAGE" | "THUMBNAIL" | "IMAGE" | "VIDEO";

export interface UploadParams {
  file: File;
  uploadType: UploadType;
  resize?: boolean;
  fileIdx?: number;
}

export interface Params<Body = any> {
  url: string;
  body?: Body;
  config?: AxiosRequestConfig | undefined;
  options?: Options;
}

type AxiosCustomError<Data = any> = {
  type: "ERROR";
  message: string;
  ok: boolean;
  data: ErrorAppAPI<Data> | undefined;
  httpStatus: number | null | undefined;
};

type ApiCustomError<Data = any> = {
  type: "API_ERROR";
  message: string;
  ok: boolean;
  data: AppAPI<Data> | undefined;
  httpStatus: number | null | undefined;
};

type ApiCustomSuccess<Data = any> = {
  type: "SUCCESS";
  message: string | null;
  ok: boolean;
  data: AppAPI<Data>;
  httpStatus: number;
};

export type SuccessJSON<Data = any> = ApiCustomSuccess<Data>;

export type ErrorJSON<Data = any> =
  | AxiosCustomError<Data>
  | ApiCustomError<Data>;

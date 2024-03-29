import { AxiosRequestConfig } from "axios";
import _ from "lodash-es";
import { client } from "./client";
import { API_ENDPOINTS, STORAGE_KEY } from "@constants/constant";
import moment from "moment";
// types
import type { Options, Params, AppAPI } from "@api/schema/api";
class ApiModule {
  async authorized(options?: Partial<Options>) {
    if (!options?.withAuthorization) {
      return null;
    }

    const expire = localStorage.getItem(STORAGE_KEY.EXPIRE_TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
    if (expire && parseInt(expire) < moment().unix() && refreshToken) {
      const returnData = await this.post({
        url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        body: { refreshToken: refreshToken },
      });
      localStorage.setTime(
        STORAGE_KEY.ACCESS_TOKEN,
        returnData.data.accessToken
      );
      localStorage.setTime(
        STORAGE_KEY.REFRESH_TOKEN,
        returnData.data.refreshToken
      );
      localStorage.setTime(STORAGE_KEY.EXPIRE_TOKEN, returnData.data.exp);
    }

    const authorization = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (!authorization) return null;
    return authorization;
  }

  baseConfig = async (
    config: AxiosRequestConfig | undefined,
    options: Partial<Options>
  ) => {
    const authorization = await this.authorized(options);
    return {
      ...(config && _.omit(config, ["headers"])),
      headers: {
        "Content-Type": "application/json",
        ...(authorization && {
          Authorization: "Bearer " + authorization,
        }),
        ...(config && config.headers),
      },
    };
  };

  async delete<D = any>({
    url,
    config = undefined,
    options = { context: null, fallbackData: null, withAuthorization: true },
  }: Params) {
    return client.delete(url, await this.baseConfig(config, options));
  }

  async post<D = any>({
    url,
    body,
    config = undefined,
    options = { context: null, fallbackData: null, withAuthorization: true },
  }: Params) {
    const post = client.post(url, body, await this.baseConfig(config, options));
    return post;
  }

  async put<D = any>({
    url,
    body = {},
    config = undefined,
    options = { context: null, fallbackData: null, withAuthorization: true },
  }: Params) {
    return client.put(url, body, await this.baseConfig(config, options));
  }

  async get<D = any>({
    url,
    config = undefined,
    options = { context: null, fallbackData: null, withAuthorization: true },
  }: Params) {
    return client.get(url, await this.baseConfig(config, options));
  }

  async patch<D = any>({
    url,
    body,
    config = undefined,
    options = { context: null, fallbackData: null, withAuthorization: true },
  }: Params) {
    const post = client.patch(url, body, await this.baseConfig(config, options));
    return post;
  }

}

export const api = new ApiModule();

// api
import { api } from "@api/module";
import { API_ENDPOINTS, STATUS_CODE, STORAGE_KEY } from "@constants/constant";
// types
import type { LoginBody, LoginResponse } from "@api/schema/body";
import { loginUser, clearUser } from "@store/slices/userSlice";
import { useDispatch } from "react-redux";
import moment from "moment";

//const dispatch = useDispatch();

class LoginAuth {
  async login(body: LoginBody) {
    try {
      const response = await api.post({
        url: API_ENDPOINTS.AUTH.LOGIN,
        body,
      });
      this.setToken(response);
      return { status: STATUS_CODE.OK };
    } catch (error: any) {
      return { status: error.response.status };
    }
  }

  setToken(response: any) {
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, response.data.accessToken);
    localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, response.data.refreshToken);
    localStorage.setItem(STORAGE_KEY.EXPIRE_TOKEN, response.data.exp);
  }

  removeToken() {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEY.EXPIRE_TOKEN);
  }

  async logout() {
    try {
      //clearUser();
      //dispatch(clearUser());
      this.removeToken();
    } catch (e) {}
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
    const expire = localStorage.getItem(STORAGE_KEY.EXPIRE_TOKEN);
    if (!expire) {
      this.logout();
      return false;
    }
    if (parseInt(expire) < moment().unix()) {
      const response = await api.post({
        url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        body: { refreshToken: refreshToken },
      });
      this.setToken(response);
    }
  }
}

export const loginAuth = new LoginAuth();

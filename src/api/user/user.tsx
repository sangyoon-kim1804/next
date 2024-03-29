import { api } from "@api/module";
import { API_ENDPOINTS, RESULT_CODE } from "@constants/constant";
import { loginAuth } from "@api/auth";
class User {
  async getUser() {
    try {
      const response = await api.get({
        url: API_ENDPOINTS.USER.INFO,
        options: { withAuthorization: true },
      });
      return { user: response.data, status: RESULT_CODE.OK };
    } catch (e: any) {
      return { status: RESULT_CODE.BAD_REQUEST };
    }
  }
}

export const userApi = new User();

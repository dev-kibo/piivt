import api from "../api/api";
import { ApiResponse } from "../api/api";
import AdminModel from "../../../03-back-end/src/components/admin/model";
export default class AuthService {
  public static async SignIn(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api("post", "/auth/sign-in", {
          email,
          password,
        });

        resolve(res.data);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }

  public static async getCurrentUser(): Promise<AdminModel> {
    return new Promise<AdminModel>(async (resolve, reject) => {
      try {
        const res = await api("get", "/admins/me");

        resolve(res.data as AdminModel);
      } catch (error) {
        reject(error as ApiResponse);
      }
    });
  }
}

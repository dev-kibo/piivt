import api from "../api/api";

export default class AuthService {
  public static async SignIn(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return new Promise(async (resolve, reject) => {
      const res = await api("post", "/auth/sign-in", {
        email,
        password,
      });

      resolve(res.data);
    });
  }
}

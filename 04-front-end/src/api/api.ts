import axios, { AxiosResponse } from "axios";
import { AppConfiguration } from "../config/app.config";

type ApiMethod = "get" | "post" | "put" | "delete";

export interface ApiResponse {
  status: number;
  data: any;
  message?: {
    code?: string;
    description?: string;
  };
}

export default function api(
  method: ApiMethod,
  path: string,
  body: any | undefined = undefined,
  attemptToRefresh: boolean = true
): Promise<ApiResponse> {
  return new Promise<ApiResponse>(async (resolve, reject) => {
    try {
      const res = await axios({
        method: method,
        baseURL: AppConfiguration.API_URL,
        url: path,
        data: body ? JSON.stringify(body) : "",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken(),
        },
      });

      return responseHandler(res, resolve);
    } catch (error: any) {
      if (error.response) {
        reject({
          status: error?.response?.status,
          message: error?.response?.data,
        } as ApiResponse);
      }
    }

    // axios({
    //   method: method,
    //   baseURL: AppConfiguration.API_URL,
    //   url: path,
    //   data: body ? JSON.stringify(body) : "",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + getAuthToken(),
    //   },
    // })
    //   .then((res) => responseHandler(res, resolve))
    //   .catch(async (err) => {
    //     if (attemptToRefresh && err?.status === 401) {
    //       const newToken: string | null = await refreshToken();

    //       if (newToken === null) {
    //         return resolve({
    //           status: 401,
    //           data: null,
    //         });
    //       }

    //       saveAuthToken(newToken);

    //       api(method, path, body, false)
    //         .then((res) => resolve(res))
    //         .catch(() => {
    //           resolve({
    //             status: 401,
    //             data: null,
    //           });
    //         });

    //       return;
    //     }

    //     if (err?.response?.status === 401) {
    //       return resolve({
    //         status: 401,
    //         data: null,
    //       });
    //     }

    //     if (err?.response?.status === 403) {
    //       return resolve({
    //         status: 403,
    //         data: "Not authorized",
    //       });
    //     }

    //     resolve({
    //       status: err?.status,
    //       data: err?.response,
    //     });
    //   });
  });
}

export function apiAsForm(
  method: ApiMethod,
  path: string,
  body: FormData,
  attemptToRefresh: boolean = true
): Promise<ApiResponse> {
  return new Promise<ApiResponse>(async (resolve, reject) => {
    try {
      const response = await axios({
        method: method,
        baseURL: AppConfiguration.API_URL,
        url: path,
        data: body,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getAuthToken(),
        },
      });

      responseHandler(response, resolve);
    } catch (error: any) {
      if (error.response) {
        reject({
          status: error?.response?.status,
          message: error?.response?.data,
        } as ApiResponse);
      }
    }

    // axios({
    //   method: method,
    //   baseURL: AppConfiguration.API_URL,
    //   url: path,
    //   data: body,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + getAuthToken(),
    //   },
    // })
    //   .then((res) => responseHandler(res, resolve))
    //   .catch(async (err) => {
    // if (attemptToRefresh && ("" + err).includes("401")) {
    //   const newToken: string | null = await refreshToken();

    //   if (newToken === null) {
    //     return resolve({
    //       data: null,
    //     });
    //   }

    //   saveAuthToken(newToken);

    //   apiAsForm(method, path, body, false)
    //     .then((res) => resolve(res))
    //     .catch(() => {
    //       resolve({
    //         data: null,
    //       });
    //     });

    //   return;
    // }

    // if (err?.response?.status === 401) {
    //   return resolve({
    //     data: null,
    //   });
    // }

    // if (err?.response?.status === 403) {
    //   return resolve({
    //     data: "Not authorized",
    //   });
    // }

    // resolve({
    //   data: err?.response,
    // });
  });
}

function responseHandler(
  res: AxiosResponse<any>,
  resolve: (data: ApiResponse) => void
) {
  if (res?.status < 200 || res?.status >= 300) {
    return resolve({
      status: res?.status,
      data: "" + res,
    });
  }

  resolve({
    status: res?.status,
    data: res.data,
  });
}

function getAuthToken(): string {
  return localStorage.getItem("access-token") ?? "";
}

// function getRefreshToken(): string {
//   return localStorage.getItem("refresh_token") ?? "";
// }

export function saveAuthToken(token: string) {
  localStorage.setItem("access-token", token);
}

export function saveRefreshToken(token: string) {
  localStorage.setItem("refresh-token", token);
}

export function saveEmail(email: string) {
  localStorage.setItem("email", email);
}

export function getEmail(): string {
  return localStorage.getItem("email") ?? "";
}

// function refreshToken(): Promise<string | null> {
//   return new Promise<string | null>((resolve) => {
//     axios({
//       method: "post",
//       baseURL: AppConfiguration.API_URL,
//       url: "/auth/refresh-token",
//       data: JSON.stringify({
//         refreshToken: getRefreshToken(),
//       }),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => refreshTokenResponseHandler(res, resolve))
//       .catch(() => {
//         resolve(null);
//       });
//   });
// }

// function refreshTokenResponseHandler(
//   res: AxiosResponse<any>,
//   resolve: (data: string | null) => void
// ) {
//   if (res.status !== 200) {
//     return resolve(null);
//   }

//   resolve(res.data?.authToken);
// }

// export function isRoleLoggedIn(role: ApiRole): Promise<boolean> {
//     return new Promise<boolean>(resolve => {
//         api("get", "/auth/" + role + "/ok", role)
//         .then(res => {
//             if (res?.data === "OK") return resolve(true);
//             resolve(false);
//         })
//         .catch(() => {
//             resolve(false);
//         })
//     });
// }

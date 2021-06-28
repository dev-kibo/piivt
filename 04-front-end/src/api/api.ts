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
      if (error.response.status >= 403) {
        return reject({
          status: error?.response?.status,
          message: error?.response?.data,
        } as ApiResponse);
      }

      if (attemptToRefresh && error.response.status === 401) {
        const data: { accessToken: string; refreshToken: string } | null =
          await refreshToken();

        if (data === null) {
          return reject({
            status: 401,
          });
        }

        saveAuthToken(data.accessToken);
        saveRefreshToken(data.refreshToken);

        api(method, path, body, false)
          .then((res) => resolve(res))
          .catch(() => {
            reject({
              status: 401,
            });
          });

        return;
      }
    }
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
      if (error.response.status >= 403) {
        return reject({
          status: error?.response?.status,
          message: error?.response?.data,
        } as ApiResponse);
      }

      if (attemptToRefresh && error.response.status === 401) {
        const data: { accessToken: string; refreshToken: string } | null =
          await refreshToken();

        if (data === null) {
          return reject({
            status: 401,
          });
        }

        saveAuthToken(data.accessToken);
        saveRefreshToken(data.refreshToken);

        apiAsForm(method, path, body, false)
          .then((res) => resolve(res))
          .catch(() => {
            reject({
              status: 401,
            });
          });

        return;
      }
    }
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

function getRefreshToken(): string {
  return localStorage.getItem("refresh-token") ?? "";
}

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

function refreshToken(): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> {
  return new Promise<{ accessToken: string; refreshToken: string } | null>(
    (resolve) => {
      axios({
        method: "post",
        baseURL: AppConfiguration.API_URL,
        url: "/auth/token/refresh",
        data: JSON.stringify({
          refreshToken: getRefreshToken(),
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => refreshTokenResponseHandler(res, resolve))
        .catch(() => {
          resolve(null);
        });
    }
  );
}

function refreshTokenResponseHandler(
  res: AxiosResponse<any>,
  resolve: (data: { accessToken: string; refreshToken: string } | null) => void
) {
  if (res.status !== 200) {
    return resolve(null);
  }

  resolve({
    accessToken: res.data?.accessToken,
    refreshToken: res.data?.refreshToken,
  });
}

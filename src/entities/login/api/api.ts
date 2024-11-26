import { AnyObject } from "antd/es/_util/type";

import { baseApi } from "@shared/api";
import {
  API_MAP,
  API_METHODS,
  setCookie,
  setLocalStorage,
} from "@shared/lib/helpers";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (credentials) => ({
        url: API_MAP["log-in"],
        method: API_METHODS.POST,
        body: credentials,
      }),
      transformResponse: (response: AnyObject) => {
        if (response?.result?.accessToken && response?.result?.permissions) {
          setCookie("access_token", response?.result?.accessToken);
          setLocalStorage("user", {
            permissions_pathname: response?.result?.permissions,
          });
          return { status: 200 };
        } else {
          return {
            status: 400,
            message: response?.result?.message || "Неверные данные",
          };
        }
      },
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;

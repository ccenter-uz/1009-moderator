import { notification } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";

import { baseApi } from "@shared/api";
import {
  API_MAP,
  API_METHODS,
  RESPONSE_STATUS,
  setCookie,
  setLocalStorage,
} from "@shared/lib/helpers";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (credentials) => ({
        url: API_MAP.LOG_IN,
        method: API_METHODS.POST,
        body: credentials,
      }),
      transformResponse: (response: AnyObject) => {
        if (response?.result?.accessToken && response?.result?.permissions) {
          setCookie("access_token", response.result.accessToken);
          setLocalStorage("user", {
            permissions_pathname: response.result.permissions,
          });
          notification.success({
            message: i18next.t("success"),
            placement: "bottomRight",
          });
          return { status: RESPONSE_STATUS.SUCCESS };
        } else {
          return null;
        }
      },
      transformErrorResponse: (response: AnyObject) => {
        notification.error({
          message: response?.data?.message,
          placement: "bottomRight",
        });
      },
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;

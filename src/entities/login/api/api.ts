import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { notification } from "antd";
import i18next from "i18next";

import { baseApi } from "@shared/api";
import {
  API_MAP,
  API_METHODS,
  RESPONSE_STATUS,
  setCookie,
  setLocalStorage,
} from "@shared/lib/helpers";

import { errorLoginType, successLoginType } from "../model/types";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (credentials) => ({
        url: API_MAP.LOG_IN,
        method: API_METHODS.POST,
        body: credentials,
      }),
      transformResponse: (response: successLoginType) => {
        if (response.result) {
          if (response.result.accessToken) {
            setCookie("access_token", response.result.accessToken);
          }

          if (response.result.permissions) {
            setLocalStorage("user", {
              permissions_pathname: response.result.permissions,
            });
          }

          notification.success({
            message: i18next.t("success"),
            placement: "bottomRight",
          });
          return { status: RESPONSE_STATUS.SUCCESS };
        } else {
          return null;
        }
      },
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;

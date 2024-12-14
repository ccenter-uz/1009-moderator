import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import i18next from "i18next";

import { API_MAP, deleteCookie, getCookie } from "@shared/lib/helpers";
import { RootState } from "@shared/types/store";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>,
) => {
  const rawResult = await fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth?.token || getCookie("access_token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  // Check for 401 Unauthorized error
  if (rawResult.error?.status === 401) {
    // Redirect to the login page
    deleteCookie("access_token");
    window.location.href = API_MAP.LOG_IN;
    notification.error({
      message: i18next.t("unauthorized"),
      placement: "bottomRight",
    });
  }

  return rawResult;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [
    "Users",
    "Roles",
    "MainOrg",
    "Products",
    "Products-subcategory",
    "Nearby",
    "NearbyCategory",
    "Regions",
    "Cities",
    "Districts",
    "Passages",
    "Categories",
    "SubCategories",
    "Segments",
    "Streets",
  ],
  endpoints: () => ({}),
});

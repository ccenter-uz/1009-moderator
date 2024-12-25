import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import i18next from "i18next";

import { deleteCookie, getCookie, RESPONSE_STATUS } from "@shared/lib/helpers";
import { RootState } from "@shared/types/store";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

interface IRowResultData {
  status?: number;
  error?: { message: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any;
}

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

  const errorData: IRowResultData =
    rawResult.error?.data || rawResult.data || {};

  if (errorData.error) {
    notification.error({
      message: `${errorData.status}: ${errorData.error.message.toUpperCase()}`,
      placement: "bottomRight",
    });
  }

  // Check for 401 and 403 Unauthorized error
  if (
    [RESPONSE_STATUS.UNAUTHENTICATED, RESPONSE_STATUS.UNAUTHORIZED].includes(
      errorData.status as number,
    )
  ) {
    // Redirect to the login page
    deleteCookie("access_token");

    window.location.href = "/login";
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
    "Areas",
    "ResidentialArea",
    "Impasses",
    "Villages",
    "Avenues",
    "Lanes",
    "PhoneType",
    "Organizations",
    "UnconfirmedOrganizations",
  ],
  endpoints: () => ({}),
});

import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import i18next from "i18next";

import {
  clearCookie,
  clearLocalStorage,
  clearSessionStorage,
  deleteCookie,
  getLocalStorage,
  removeLocalStorage,
  RESPONSE_STATUS,
} from "@shared/lib/helpers";
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
        (getState() as RootState).auth?.token ||
        getLocalStorage("access_token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  const errorData: IRowResultData =
    rawResult.error?.data || rawResult.data || {};

  if (
    [RESPONSE_STATUS.UNAUTHENTICATED, RESPONSE_STATUS.UNAUTHORIZED].includes(
      errorData.status as number,
    )
  ) {
    if (window.location.pathname !== "/login") {
      clearLocalStorage();
      clearSessionStorage();
      clearCookie();
      notification.error({
        message: errorData.error?.message || i18next.t("unauthorized"),
        placement: "bottomRight",
      });

      window.location.href = "/login";
    }
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
    "Me",
    "MyOrganizations",
    "UsersMonitoring",
    "OrganizationMonitoring",
    "AdditionalCategories",
    "Additional",
    "Neighborhoods",
  ],
  endpoints: () => ({}),
});

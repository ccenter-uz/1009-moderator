import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { deleteCookie, getCookie } from "@shared/lib/helpers";
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
    window.location.href = "/login";
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
  ],
  endpoints: () => ({}),
});

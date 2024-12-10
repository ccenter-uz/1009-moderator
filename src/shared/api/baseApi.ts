import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getCookie } from "@shared/lib/helpers";
import { RootState } from "@shared/types/store";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,

  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth?.token || getCookie("access_token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

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
  ],
  endpoints: () => ({}),
});

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

import { RootState } from "@shared/types/store";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQueryWithRetry(args, api, extraOptions);
    if (result.error) {
      return { error: result.error };
    }
    return result;
  },
  endpoints: () => ({}),

  tagTypes: ["Counter"],
});

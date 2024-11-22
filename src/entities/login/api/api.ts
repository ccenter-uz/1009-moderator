import { baseApi } from "@shared/api";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (credentials) => ({
        url: "user/log-in",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;

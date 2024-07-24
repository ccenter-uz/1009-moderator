import { baseApi } from "@shared/api/baseApi";

import { User, GetUserParams, UpdateUserParams } from "./types";

export const userEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, GetUserParams>({
      query: ({ id }) => `users/${id}`,
    }),
    updateUser: build.mutation<User, UpdateUserParams>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { getUser, updateUser } = userEndpoints.endpoints;

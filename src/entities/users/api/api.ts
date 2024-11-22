import { baseApi } from "@shared/api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "user",
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

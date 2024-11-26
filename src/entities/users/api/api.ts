import { AnyObject } from "antd/es/_util/type";

import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setRoles, setUsers } from "../model/Slicer";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({ url: API_MAP.users, params }),
      providesTags: ["Users"],
      transformResponse: (response: AnyObject) => {
        return {
          data: response?.result?.data.map((item: { id: string }) => ({
            ...item,
            key: item.id,
          })),
          total: response?.result?.totalDocs,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setUsers(
              data?.data?.map((item: { id: string }) => ({
                ...item,
                key: item.id,
              })),
            ),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getRoles: build.query({
      query: (params) => ({ url: API_MAP.roles, params }),
      providesTags: ["Roles"],
      transformResponse: (response: AnyObject) => {
        return {
          data: response?.result?.data.map((item: { id: string }) => ({
            ...item,
            key: item.id,
          })),
          total: response?.result?.totalDocs,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setRoles(
              data?.data?.map((item: { id: string }) => ({
                ...item,
                key: item.id,
              })),
            ),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: API_MAP.createUser,
        method: API_METHODS.POST,
        body,
      }),

      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: `${API_MAP.updateUser}/${body.userId}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetRolesQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi;

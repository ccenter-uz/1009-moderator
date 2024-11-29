import { AnyObject } from "antd/es/_util/type";

import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setRoles, setUsers } from "../model/Slicer";
import { getRolesType, getUsersType } from "../model/types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({ url: API_MAP.USERS, params }),
      providesTags: ["Users"],
      transformResponse: (response: getUsersType) => {
        return {
          data: response?.result?.data.map((item: { id: string }) => ({
            ...item,
            key: item.id,
          })),
          total: response?.result?.totalDocs,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          setUsers(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    getRoles: build.query({
      query: (params) => ({ url: API_MAP.ROLES, params }),
      providesTags: ["Roles"],
      transformResponse: (response: getRolesType) => {
        return {
          data: response?.result?.data.map((item: { id: string }) => ({
            ...item,
            key: item.id,
          })),
          total: response?.result?.totalDocs,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          setRoles(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_USER,
        method: API_METHODS.POST,
        body,
      }),

      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_USER}/${body.userId}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_USER}/${id}`,
        method: API_METHODS.DELETE,
        params: { delete: true },
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
  useDeleteUserMutation,
} = usersApi;

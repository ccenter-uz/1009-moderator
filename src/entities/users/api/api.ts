import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS, setLocalStorage } from "@shared/lib/helpers";

import { setRoles, setUsers } from "../model/Slicer";
import { getRolesType, getUsersType } from "../model/types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET-USERS
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
    // GET-ROLES
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
    // CREATE-USER
    createUser: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_USER,
        method: API_METHODS.POST,
        body,
      }),

      invalidatesTags: ["Users"],
    }),
    // UPDATE-USER
    updateUser: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_USER}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    // DELETE-USER
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_USER}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Users"],
    }),
    // RESTORE-USER
    restoreUser: build.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_USER}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Users"],
    }),

    // GET-ME
    getMe: build.query({
      query: () => ({ url: API_MAP.ME }),
      onQueryStarted(args, { queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          setLocalStorage("user-name", data?.result.fullName);
        });
      },
      providesTags: ["Me"],
    }),

    // UPDATE-ME
    updateMe: build.mutation({
      query: (body) => ({
        url: API_MAP.UPDATE_ME,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetRolesQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useGetMeQuery,
  useUpdateMeMutation,
} = usersApi;

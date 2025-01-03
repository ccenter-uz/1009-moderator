import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setMainOrg } from "../model/Slicer";
import { getMainOrgType } from "../model/types";

export const mainOrgApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMainOrg: builder.query({
      query: (params) => ({
        url: API_MAP.MAIN_ORGANIZATION_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["MainOrg"],
      transformResponse: (response: getMainOrgType) => {
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
          setMainOrg(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    updateMainOrg: builder.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_MAIN_ORGANIZATION}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["MainOrg"],
    }),
    createMainOrg: builder.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_MAIN_ORGANIZATION,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["MainOrg"],
    }),
    deleteMainOrg: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_MAIN_ORGANIZATION}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["MainOrg"],
    }),
  }),
});

export const {
  useGetMainOrgQuery,
  useLazyGetMainOrgQuery,
  useUpdateMainOrgMutation,
  useCreateMainOrgMutation,
  useDeleteMainOrgMutation,
} = mainOrgApi;

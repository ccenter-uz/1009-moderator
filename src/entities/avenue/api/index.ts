import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setAvenues } from "../model/Slicer";
import { getAvenuesType } from "../model/types";

export const avenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvenues: builder.query({
      query: (params) => ({
        url: API_MAP.AVENUE_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Avenues"],
      transformResponse: (response: getAvenuesType) => {
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
          setAvenues(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-AVENUE
    createAvenue: builder.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_AVENUE,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Avenues"],
    }),

    // UPDATE-AVENUE
    updateAvenue: builder.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_AVENUE}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Avenues"],
    }),

    // DELETE-AVENUE
    deleteAvenue: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_AVENUE}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Avenues"],
    }),

    // RESTORE-AVENUE
    restoreAvenue: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_AVENUE}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Avenues"],
    }),
  }),
});

export const {
  useGetAvenuesQuery,
  useCreateAvenueMutation,
  useUpdateAvenueMutation,
  useDeleteAvenueMutation,
  useRestoreAvenueMutation,
} = avenueApi;

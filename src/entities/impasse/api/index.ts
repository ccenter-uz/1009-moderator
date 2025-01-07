import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setImpasses } from "../model/Slicer";
import { getImpassesType } from "../model/types";

export const impasseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getImpasses: builder.query({
      query: (params) => ({
        url: API_MAP.IMPASSE_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Impasses"],
      transformResponse: (response: getImpassesType) => {
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
          setImpasses(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-IMPASSE
    createImpasse: builder.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_IMPASSE,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Impasses"],
    }),

    // UPDATE-IMPASSE
    updateImpasse: builder.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_IMPASSE}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Impasses"],
    }),

    // DELETE-IMPASSE
    deleteImpasse: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_IMPASSE}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Impasses"],
    }),

    // RESTORE-IMPASSE
    restoreImpasse: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_IMPASSE}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Impasses"],
    }),
  }),
});

export const {
  useGetImpassesQuery,
  useCreateImpasseMutation,
  useUpdateImpasseMutation,
  useDeleteImpasseMutation,
  useRestoreImpasseMutation,
} = impasseApi;

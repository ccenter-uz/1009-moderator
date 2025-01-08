import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setStreets } from "../model/Slicer";
import { getStreetsType } from "../model/types";

export const streetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStreets: builder.query({
      query: (params) => ({
        url: API_MAP.STREET_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Streets"],
      transformResponse: (response: getStreetsType) => {
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
          setStreets(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE
    createStreet: builder.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_STREET,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Streets"],
    }),

    // UPDATE
    updateStreet: builder.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_STREET}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Streets"],
    }),

    // DELETE
    deleteStreet: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_STREET}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Streets"],
    }),

    // RESTORE
    restoreStreet: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_STREET}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Streets"],
    }),
  }),
});

export const {
  useGetStreetsQuery,
  useCreateStreetMutation,
  useUpdateStreetMutation,
  useDeleteStreetMutation,
  useRestoreStreetMutation,
} = streetApi;

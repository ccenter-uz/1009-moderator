import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setNeighborhoods } from "../model/Slicer";
import { getNeighborhoodType } from "../model/types";

export const neighborhoodApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET-NEIGHBORHOOD
    getNeighborhoods: build.query({
      query: (params) => ({
        url: API_MAP.NEIGHBORHOOD_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Neighborhoods"],
      transformResponse: (response: getNeighborhoodType) => {
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
          setNeighborhoods(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-NEIGHBORHOOD
    createNeighborhood: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_NEIGHBORHOOD,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Neighborhoods"],
    }),

    // UPDATE-NEIGHBORHOOD
    updateNeighborhood: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_NEIGHBORHOOD}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Neighborhoods"],
    }),

    // DELETE-NEIGHBORHOOD
    deleteNeighborhood: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_NEIGHBORHOOD}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Neighborhoods"],
    }),

    // RESTORE-NEIGHBORHOOD
    restoreNeighborhood: build.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_NEIGHBORHOOD}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Neighborhoods"],
    }),
  }),
});

export const {
  useGetNeighborhoodsQuery,
  useCreateNeighborhoodMutation,
  useUpdateNeighborhoodMutation,
  useDeleteNeighborhoodMutation,
  useRestoreNeighborhoodMutation,
} = neighborhoodApi;

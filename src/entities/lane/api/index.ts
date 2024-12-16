import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setLane } from "../model/Slicer";
import { getLaneType } from "../model/types";

export const laneApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLanes: builder.query({
      query: (params) => ({
        url: API_MAP.LANE_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Lanes"],
      transformResponse: (response: getLaneType) => {
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
          setLane(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-LANE
    createLane: builder.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_LANE,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Lanes"],
    }),

    // UPDATE-LANE
    updateLane: builder.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_LANE}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Lanes"],
    }),

    // DELETE-LANE
    deleteLane: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_LANE}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Lanes"],
    }),
  }),
});

export const {
  useGetLanesQuery,
  useCreateLaneMutation,
  useUpdateLaneMutation,
  useDeleteLaneMutation,
} = laneApi;

import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setSegments } from "../model/Slicer";
import { getSegmentsType } from "../model/types";

export const SegmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET-SEGMENTS
    getSegments: builder.query({
      query: (params) => ({
        url: API_MAP.SEGMENTS_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Segments"],
      transformResponse: (response: getSegmentsType) => {
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
          setSegments(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-SEGMENT
    createSegment: builder.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_SEGMENT,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Segments"],
    }),

    // UPDATE-SEGMENT
    updateSegment: builder.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_SEGMENT}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Segments"],
    }),

    // DELETE-SEGMENT
    deleteSegment: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_SEGMENT}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Segments"],
    }),

    // RESTORE-SEGMENT
    restoreSegment: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_SEGMENT}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Segments"],
    }),
  }),
});

export const {
  useGetSegmentsQuery,
  useCreateSegmentMutation,
  useUpdateSegmentMutation,
  useDeleteSegmentMutation,
  useRestoreSegmentMutation,
} = SegmentsApi;

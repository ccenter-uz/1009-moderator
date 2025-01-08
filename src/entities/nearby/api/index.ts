import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setNearby, setNearbyCategory } from "../model/Slicer";
import { getNearbyCategoryType, getNearbyType } from "../model/types";

export const nearbyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET-CATEGORY
    getNearbyCategory: build.query({
      query: (params) => ({
        url: API_MAP.NEARBY_CATEGORY_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["NearbyCategory"],
      transformResponse: (response: getNearbyCategoryType) => {
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
          setNearbyCategory(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    // CREATE-CATEGORY
    createNearbyCategory: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_NEARBY_CATEGORY,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["NearbyCategory"],
    }),

    // UPDATE-CATEGORY
    updateNearbyCategory: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_NEARBY_CATEGORY}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["NearbyCategory"],
    }),

    // DELETE-CATEGORY
    deleteNearbyCategory: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_NEARBY_CATEGORY}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["NearbyCategory"],
    }),

    // RESTORE-CATEGORY
    restoreNearbyCategory: build.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_NEARBY_CATEGORY}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["NearbyCategory"],
    }),

    // GET-NEARBY
    getNearby: build.query({
      query: (params) => ({
        url: API_MAP.NEARBY_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Nearby"],
      transformResponse: (response: getNearbyType) => {
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
          setNearby(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-NEARBY
    createNearby: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_NEARBY,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Nearby"],
    }),

    // UPDATE-NEARBY
    updateNearby: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_NEARBY}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Nearby"],
    }),

    // DELETE-NEARBY
    deleteNearby: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_NEARBY}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Nearby"],
    }),

    // RESTORE-NEARBY
    restoreNearby: build.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_NEARBY}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Nearby"],
    }),
  }),
});

export const {
  useGetNearbyCategoryQuery,
  useGetNearbyQuery,
  useLazyGetNearbyQuery,
  useCreateNearbyCategoryMutation,
  useCreateNearbyMutation,
  useUpdateNearbyCategoryMutation,
  useUpdateNearbyMutation,
  useDeleteNearbyCategoryMutation,
  useDeleteNearbyMutation,
  useRestoreNearbyCategoryMutation,
  useRestoreNearbyMutation,
} = nearbyApi;

import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setAreas } from "../model/Slicer";
import { getAreasType } from "../model/types";

export const areaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAreas: builder.query({
      query: (params) => ({
        url: API_MAP.AREA_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Areas"],
      transformResponse: (response: getAreasType) => {
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
          setAreas(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-AREA
    createArea: builder.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_AREA,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Areas"],
    }),

    // UPDATE-AREA
    updateArea: builder.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_AREA}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Areas"],
    }),

    // DELETE-AREA
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_AREA}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Areas"],
    }),

    // RESTORE-AREA
    restoreArea: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_AREA}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Areas"],
    }),
  }),
});

export const {
  useGetAreasQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
  useRestoreAreaMutation,
} = areaApi;

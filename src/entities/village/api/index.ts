import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setVillages } from "../model/Slicer";
import { getVillagesType } from "../model/types";

export const areaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVillages: builder.query({
      query: (params) => ({
        url: API_MAP.VILLAGE_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Villages"],
      transformResponse: (response: getVillagesType) => {
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
          setVillages(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-VILLAGES
    createVillage: builder.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_VILLAGE,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Villages"],
    }),

    // UPDATE-VILLAGES
    updateVillage: builder.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_VILLAGE}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Villages"],
    }),

    // DELETE-VILLAGES
    deleteVillage: builder.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_VILLAGE}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Villages"],
    }),
  }),
});

export const {
  useGetVillagesQuery,
  useCreateVillageMutation,
  useUpdateVillageMutation,
  useDeleteVillageMutation,
} = areaApi;

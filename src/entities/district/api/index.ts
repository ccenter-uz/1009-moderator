import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setDistricts } from "../model/Slicer";
import { getDistrictsType } from "../model/types";

export const districtApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDistricts: build.query({
      query: (params) => ({
        url: API_MAP.DISTRICT_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Districts"],
      transformResponse: (response: getDistrictsType) => {
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
          setDistricts(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    createDistrict: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_DISTRICT,
        method: API_METHODS.POST,
        body,
      }),

      invalidatesTags: ["Districts"],
    }),
    updateDistrict: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_DISTRICT}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Districts"],
    }),
    deleteDistrict: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_DISTRICT}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Districts"],
    }),
  }),
});

export const {
  useGetDistrictsQuery,
  useLazyGetDistrictsQuery,
  useCreateDistrictMutation,
  useDeleteDistrictMutation,
  useUpdateDistrictMutation,
} = districtApi;

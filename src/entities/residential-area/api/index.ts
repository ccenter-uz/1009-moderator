import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setResidentialAreas } from "../model/Slicer";
import { getResidentialAreaType } from "../model/types";

export const residentialAreaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResidentialAreas: build.query({
      query: (params) => ({
        url: API_MAP.RESIDENTIAL_AREA_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["ResidentialArea"],
      transformResponse: (response: getResidentialAreaType) => {
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
          setResidentialAreas(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-RESIDENTIAL-AREA
    createResidentialArea: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_RESIDENTIAL_AREA,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["ResidentialArea"],
    }),

    // UPDATE-RESIDENTIAL-AREA
    updateResidentialArea: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_RESIDENTIAL_AREA}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["ResidentialArea"],
    }),

    // DELETE-RESIDENTIAL-AREA
    deleteResidentialArea: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_RESIDENTIAL_AREA}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["ResidentialArea"],
    }),
  }),
});

export const {
  useGetResidentialAreasQuery,
  useCreateResidentialAreaMutation,
  useUpdateResidentialAreaMutation,
  useDeleteResidentialAreaMutation,
} = residentialAreaApi;

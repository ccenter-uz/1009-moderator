import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setCities, setRegions } from "../model/Slicer";
import { CitiesType, RegionsType } from "../model/types";

export const regionCityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRegions: build.query({
      query: (params) => ({
        url: API_MAP.REGION_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Regions"],
      transformResponse: (response: RegionsType) => {
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
          setRegions(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    getCities: build.query({
      query: (params) => ({
        url: API_MAP.CITY_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Cities"],
      transformResponse: (response: CitiesType) => {
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
          setCities(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
  }),
});

export const { useGetRegionsQuery, useGetCitiesQuery } = regionCityApi;

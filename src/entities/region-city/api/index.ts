import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setCities, setRegions } from "../model/Slicer";
import { CitiesType, RegionsType } from "../model/types";
let regionId: number;

export const regionCityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET-REGIONS
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

    // GET-CITIES
    getCities: build.query({
      query: (params) => (
        (regionId = params.regionId ? params.regionId : regionId),
        {
          url: API_MAP.CITY_ALL,
          method: API_METHODS.GET,
          params: {
            ...params,
            regionId: regionId,
          },
        }
      ),
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

export const { useGetRegionsQuery, useLazyGetCitiesQuery, useGetCitiesQuery } =
  regionCityApi;

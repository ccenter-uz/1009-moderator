import { AnyObject } from "antd/es/_util/type";

import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setOrganization } from "../model/Slicer";
import { getOrganizationType } from "../model/types";

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query({
      query: (params) => {
        console.log("params", params);

        return {
          url: API_MAP.ORGANIZATION_ALL,
          method: API_METHODS.GET,
          params,
        };
      },

      providesTags: ["Organizations"],
      transformResponse: (response: getOrganizationType) => {
        return {
          data: response?.result?.data.map((item) => ({
            ...item,
            key: item.id,
          })),
          total: response?.result?.totalDocs,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          setOrganization(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE
    createOrganization: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_ORGANIZATION,
        method: API_METHODS.POST,
        body,
      }),

      invalidatesTags: ["Organizations"],
    }),

    // UPDATE
    updateOrganization: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_ORGANIZATION}/${JSON.parse(body.get("id"))}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Organizations"],
    }),

    // DELETE
    deleteOrganization: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_ORGANIZATION}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Organizations"],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi;

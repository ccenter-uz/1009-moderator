import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import {
  setMyOrganization,
  setOneOrganization,
  setOrganization,
  setUnconfirmedOrganization,
} from "../model/Slicer";
import { getOneOrganizationType, getOrganizationType } from "../model/types";

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET-ORGANIZATIONS
    getOrganizations: build.query({
      query: (params) => ({
        url: API_MAP.ORGANIZATION_ALL,
        method: API_METHODS.GET,
        params,
      }),
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

    // GET-ONE-ORGANIZATION
    getOneOrganization: build.query({
      query: (id) => ({
        url: `${API_MAP.ORGANIZATION_ONE}/${id}`,
        method: API_METHODS.GET,
      }),
      transformResponse: (response: getOneOrganizationType) => {
        const data = [response?.result];
        return {
          data: data.map((item) => ({
            ...item,
            id: Number(item.id),
            organizationId: Number(item.organizationId),
            key: item.id,
          })),
          total: response?.result?.totalDocs,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          setOneOrganization(
            data?.data?.map((item: { id: number }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // GET-UNCONFIRMED
    getUnconfirmedOrganizations: build.query({
      query: (params) => ({
        url: API_MAP.UNCONFIRMED_ORGANIZATION_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["UnconfirmedOrganizations"],
      transformResponse: (response: getOrganizationType) => {
        return {
          data: response?.result?.data.map((item) => ({
            ...item,
            id: Number(item.id),
            organizationId: Number(item.organizationId),
            key: item.id,
          })),
          total: response?.result?.totalDocs,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          setUnconfirmedOrganization(
            data?.data?.map((item: { id: number }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    // GET-MY-ORGANIZATIONS
    getMyOrganizations: build.query({
      query: (params) => ({
        url: API_MAP.MY_ORGANIZATION_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["MyOrganizations"],
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
          setMyOrganization(
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
    }),

    // UPDATE
    updateOrganization: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_ORGANIZATION}/${JSON.parse(body.get("id"))}`,
        method: API_METHODS.PUT,
        body,
      }),
    }),

    // DELETE
    deleteOrganization: build.mutation({
      query: (params) => ({
        url: `${API_MAP.DELETE_ORGANIZATION}/${params.id}?deleteReason=${params?.deleteReason}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Organizations"],
    }),

    // CHECK
    checkOrganization: build.mutation({
      query: (body) => ({
        url: `${API_MAP.CHECK_ORGANIZATION}/${body.organizationId}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["UnconfirmedOrganizations"],
    }),

    // RESTORE
    restoreOrganization: build.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_ORGANIZATION}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["UnconfirmedOrganizations"],
    }),
  }),
});

export const {
  useGetUnconfirmedOrganizationsQuery,
  useGetOrganizationsQuery,
  useLazyGetOrganizationsQuery,
  useLazyGetOneOrganizationQuery,
  useGetMyOrganizationsQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useCheckOrganizationMutation,
  useRestoreOrganizationMutation,
} = organizationApi;

import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import {
  setOrganizationsMonitoring,
  setUsersMonitoring,
} from "../model/Slicer";
import {
  TGetMonitoringOrganizations,
  TGetMonitoringUsers,
} from "../model/type";

export const monitoringApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET-USERS-MONITORING
    getUsersMonitoring: build.query({
      query: (params) => ({
        url: API_MAP.USERS_MONITORING,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["UsersMonitoring"],
      transformResponse: (response: TGetMonitoringUsers) => {
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
          setUsersMonitoring(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    // GET-ORGANIZATION-MONITORING
    getOrganizationMonitoring: build.query({
      query: (params) => ({
        url: API_MAP.ORGANIZATIONS_MONITORING,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["OrganizationMonitoring"],
      transformResponse: (response: TGetMonitoringOrganizations) => {
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
          setOrganizationsMonitoring(
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

export const { useGetUsersMonitoringQuery, useGetOrganizationMonitoringQuery } =
  monitoringApi;

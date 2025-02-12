import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setAdditional, setAdditionalCategories } from "../model/Slicer";
import { getAdditionalCategoryType, getAdditionalsType } from "../model/type";

export const additionalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET-ADDITIONAL-CATEGORIES
    getAdditionalCategories: build.query({
      query: (params) => ({
        url: API_MAP.ADDITIONAL_CATEGORY_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["AdditionalCategories"],
      transformResponse: (response: getAdditionalCategoryType) => {
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
          setAdditionalCategories(
            data?.data?.map((item) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-ADDITIONAL-CATEGORY
    createAdditionalCategory: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_ADDITIONAL_CATEGORY,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["AdditionalCategories"],
    }),

    // UPDATE-ADDITIONAL-CATEGORY
    updateAdditionalCategory: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_ADDITIONAL_CATEGORY}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["AdditionalCategories"],
    }),

    // DELETE-ADDITIONAL-CATEGORY
    deleteAdditionalCategory: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_ADDITIONAL_CATEGORY}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["AdditionalCategories"],
    }),

    // RESTORE-ADDITIONAL-CATEGORY
    restoreAdditionalCategory: build.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_ADDITIONAL_CATEGORY}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["AdditionalCategories"],
    }),

    // GET-ADDITIONAL
    getAdditionals: build.query({
      query: (params) => ({
        url: API_MAP.ADDITIONAL_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Additional"],

      transformResponse: (response: getAdditionalsType) => {
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
          setAdditional(
            data?.data?.map((item) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-ADDITIONAL
    createAdditional: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_ADDITIONAL,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Additional"],
    }),

    // UPDATE-ADDITIONAL
    updateAdditional: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_ADDITIONAL}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Additional"],
    }),

    // DELETE-ADDITIONAL
    deleteAdditional: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_ADDITIONAL}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Additional"],
    }),

    // RESTORE-ADDITIONAL
    restoreAdditional: build.mutation({
      query: (id) => ({
        url: `${API_MAP.RESTORE_ADDITIONAL}/${id}/restore`,
        method: API_METHODS.PUT,
      }),
      invalidatesTags: ["Additional"],
    }),
  }),
});

export const {
  useGetAdditionalCategoriesQuery,
  useCreateAdditionalCategoryMutation,
  useUpdateAdditionalCategoryMutation,
  useDeleteAdditionalCategoryMutation,
  useRestoreAdditionalCategoryMutation,

  useLazyGetAdditionalsQuery,
  useCreateAdditionalMutation,
  useUpdateAdditionalMutation,
  useDeleteAdditionalMutation,
  useRestoreAdditionalMutation,
} = additionalApi;

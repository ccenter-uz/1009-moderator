import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setCategories, setSubCategories } from "../model/Slicer";
import { getCategoriesType } from "../model/types";

export const CategorySubCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: (params) => ({
        url: API_MAP.CATEGORY_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Categories"],
      transformResponse: (response: getCategoriesType) => {
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
          setCategories(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-CATEGORY
    createCategory: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_CATEGORY,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // UPDATE-CATEGORY
    updateCategory: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_CATEGORY}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // DELETE-CATEGORY
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_CATEGORY}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Categories"],
    }),

    // GET-SUBCATEGORY
    getSubCategories: build.query({
      query: (params) => ({
        url: API_MAP.SUB_CATEGORY_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["SubCategories"],
      transformResponse: (response: getCategoriesType) => {
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
          setSubCategories(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),

    // CREATE-SUBCATEGORY
    createSubCategories: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_SUB_CATEGORY,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["SubCategories"],
    }),

    // UPDATE-SUBCATEGORY
    updateSubCategories: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_SUB_CATEGORY}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["SubCategories"],
    }),

    // DELETE-SUBCATEGORY
    deleteSubCategories: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_SUB_CATEGORY}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["SubCategories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useLazyGetSubCategoriesQuery,
  useCreateSubCategoriesMutation,
  useUpdateSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
} = CategorySubCategoryApi;

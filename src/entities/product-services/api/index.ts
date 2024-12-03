import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setCategory, setSubCategory } from "../model/Slicer";
import { getCategoryType } from "../model/types";

export const productServiceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET_CATEGORY
    getProducts: build.query({
      query: (params) => ({
        url: API_MAP.PRODUCT_SERVICE_CATEGORY_ALL,
        params,
      }),
      providesTags: ["Products"],
      transformResponse: (response: getCategoryType) => {
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
          setCategory(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    // CREATE_CATEGORY
    createProduct: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_PRODUCT_SERVICE_CATEGORY,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    // UPDATE_CATEGORY
    updateProduct: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_PRODUCT_SERVICE_CATEGORY}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    // DELETE_CATEGORY
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_PRODUCT_SERVICE_CATEGORY}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Products"],
    }),

    // GET_SUBCATEGORY
    getSubCategory: build.query({
      query: (params) => ({
        url: API_MAP.PRODUCT_SERVICE_SUB_CATEGORY_ALL,
        params,
      }),
      providesTags: ["Products-subcategory"],
      transformResponse: (response: getCategoryType) => {
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
          setSubCategory(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    // CREATE_SUBCATEGORY
    createSubCategory: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_PRODUCT_SERVICE_SUB_CATEGORY,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Products-subcategory"],
    }),

    // UPDATE_SUBCATEGORY
    updateSubCategory: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_PRODUCT_SERVICE_SUB_CATEGORY}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Products-subcategory"],
    }),

    // DELETE_SUBCATEGORY
    deleteSubCategory: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_PRODUCT_SERVICE_SUB_CATEGORY}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Products-subcategory"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useLazyGetSubCategoryQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = productServiceApi;

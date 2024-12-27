import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setPhoneType } from "../model/Slicer";
import { getPhoneType } from "../model/types";

export const phoneTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET-PHONE-TYPE
    getPhoneType: build.query({
      query: (params) => ({
        url: API_MAP.PHONE_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["PhoneType"],
      transformResponse: (response: getPhoneType) => {
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
          setPhoneType(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    // CREATE-PHONE-TYPE
    createPhoneType: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_PHONE,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["PhoneType"],
    }),

    // UPDATE-PHONE-TYPE
    updatePhoneType: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_PHONE}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["PhoneType"],
    }),

    // DELETE-PHONE-TYPE
    deletePhoneType: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_PHONE}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["PhoneType"],
    }),
  }),
});

export const {
  useGetPhoneTypeQuery,
  useLazyGetPhoneTypeQuery,
  useCreatePhoneTypeMutation,
  useUpdatePhoneTypeMutation,
  useDeletePhoneTypeMutation,
} = phoneTypeApi;

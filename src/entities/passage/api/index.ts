import { baseApi } from "@shared/api";
import { API_MAP, API_METHODS } from "@shared/lib/helpers";

import { setPassages } from "../model/Slicer";
import { getPassageType } from "../model/types";

export const passageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPassages: build.query({
      query: (params) => ({
        url: API_MAP.PASSAGE_ALL,
        method: API_METHODS.GET,
        params,
      }),
      providesTags: ["Passages"],
      transformResponse: (response: getPassageType) => {
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
          setPassages(
            data?.data?.map((item: { id: string }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
      },
    }),
    // CREATE
    createPassage: build.mutation({
      query: (body) => ({
        url: API_MAP.CREATE_PASSAGE,
        method: API_METHODS.POST,
        body,
      }),
      invalidatesTags: ["Passages"],
    }),

    // UPDATE
    updatePassage: build.mutation({
      query: (body) => ({
        url: `${API_MAP.UPDATE_PASSAGE}/${body.id}`,
        method: API_METHODS.PUT,
        body,
      }),
      invalidatesTags: ["Passages"],
    }),

    // DELETE
    deletePassage: build.mutation({
      query: (id) => ({
        url: `${API_MAP.DELETE_PASSAGE}/${id}`,
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Passages"],
    }),
  }),
});

export const {
  useLazyGetPassagesQuery,
  useGetPassagesQuery,
  useCreatePassageMutation,
  useUpdatePassageMutation,
  useDeletePassageMutation,
} = passageApi;

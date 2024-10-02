import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { useAddOrgFourthStepSlice } from "@widgets/org-add-fourth-step";
import { useAddOrgThirdStepSlice } from "@widgets/org-add-third-step";

import { useAddTableCategoryTuSlice } from "@features/add-table-category-tu";
import { useAddTableOrientirSlice } from "@features/add-table-orientir";

import { baseApi } from "@shared/api";

// // eslint-disable-next-line no-restricted-imports

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined,
) =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      useAddTableCategoryTuSlice: useAddTableCategoryTuSlice.reducer,
      useAddTableOrientirSlice: useAddTableOrientirSlice.reducer,
      useAddOrgThirdStepSlice: useAddOrgThirdStepSlice.reducer,
      useAddOrgFourthStepSlice: useAddOrgFourthStepSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        baseApi.middleware,
      ),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

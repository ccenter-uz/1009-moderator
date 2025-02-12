import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { useAddOrgFirstStepSlice } from "@widgets/org-add-first-step";
import { useAddOrgFourthStepSlice } from "@widgets/org-add-fourth-step";
import { useAddOrgSecondStepSlice } from "@widgets/org-add-second-step";
import { useAddOrgThirdStepSlice } from "@widgets/org-add-third-step";
import { useEditOrgFirstStepSlice } from "@widgets/org-edit-first-step";
import { useEditOrgFourthStepSlice } from "@widgets/org-edit-fourth-step";
import { useEditOrgSecondStepSlice } from "@widgets/org-edit-second-step";
import { useEditOrgThirdStepSlice } from "@widgets/org-edit-third-step";

import { useManageUsersSlice } from "@entities/users";

import { baseApi } from "@shared/api";
import { CustomizeUISlicer } from "@shared/ui";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined,
) =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      // ADD-ORG
      useAddOrgFirstStepSlice: useAddOrgFirstStepSlice.reducer,
      useAddOrgSecondStepSlice: useAddOrgSecondStepSlice.reducer,
      useAddOrgThirdStepSlice: useAddOrgThirdStepSlice.reducer,
      useAddOrgFourthStepSlice: useAddOrgFourthStepSlice.reducer,
      // EDIT-ORG
      useEditOrgFirstStepSlice: useEditOrgFirstStepSlice.reducer,
      useEditOrgSecondStepSlice: useEditOrgSecondStepSlice.reducer,
      useEditOrgThirdStepSlice: useEditOrgThirdStepSlice.reducer,
      useEditOrgFourthStepSlice: useEditOrgFourthStepSlice.reducer,
      // MANAGE
      useManageUsersSlice: useManageUsersSlice.reducer,
      // UI-SETTINGS
      CustomizeUISlicer: CustomizeUISlicer.reducer,
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

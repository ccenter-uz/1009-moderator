// src/app/store.ts

import { configureStore } from "@reduxjs/toolkit";

import type { RootState } from "@shared/types/store";

import { apiReducers, apiMiddleware } from "./api/apiSlices";
import { rootReducer } from "./reducers/rootReducer";

export const store = configureStore({
  reducer: {
    ...rootReducer,
    ...apiReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

// This line will cause a TypeScript error if the store state doesn't match the RootState type,
// without creating any runtime code
const _: RootState = store.getState();

// Creating Redux slices for each feature and adding them to the configureStore's
// reducer is a great approach that aligns well with FSD principles.

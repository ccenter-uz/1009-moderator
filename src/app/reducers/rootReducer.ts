// src/app/reducers/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

// Import non-API reducers
// import authReducer from '@features/auth/authSlice';
// import themeReducer from '@features/theme/themeSlice';

export const rootReducer = combineReducers({
  // Non-API reducers
  // auth: authReducer,
  // theme: themeReducer,
});

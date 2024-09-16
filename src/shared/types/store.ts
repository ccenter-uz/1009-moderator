import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

// This is a placeholder type. You'll need to update it
// as your store structure changes.
export interface RootState {
  // Define your state structure here
  // For example:
  [key: string]: any;
  user: { name: string };
  auth: { token: string };
  // posts: PostsState
  // etc.
}

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

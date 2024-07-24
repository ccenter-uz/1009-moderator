import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

// This is a placeholder type. You'll need to update it
// as your store structure changes.
export interface RootState {
  // Define your state structure here
  // For example:
  user: { name: string };
  // posts: PostsState
  // etc.
}

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

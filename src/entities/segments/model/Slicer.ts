import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  segments: [],
};

export const useManageSegmentsSlice = createSlice({
  name: "useManageSegmentsSlice",
  initialState,
  reducers: {
    setSegments: (state, action) => {
      state.segments = action.payload;
    },
  },
});

export const { setSegments } = useManageSegmentsSlice.actions;
export default useManageSegmentsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lane: [],
};

export const useManageLaneSlice = createSlice({
  name: "lane",
  initialState,
  reducers: {
    setLane: (state, action) => {
      state.lane = action.payload;
    },
  },
});

export const { setLane } = useManageLaneSlice.actions;
export default useManageLaneSlice.reducer;

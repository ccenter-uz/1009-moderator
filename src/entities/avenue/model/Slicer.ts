import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avenues: [],
};

export const useManageAvenueSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    setAvenues: (state, action) => {
      state.avenues = action.payload;
    },
  },
});

export const { setAvenues } = useManageAvenueSlice.actions;
export default useManageAvenueSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nearbyCategory: [],
  nearby: [],
};

export const useManageNearbySlice = createSlice({
  name: "useNearbySlice",
  initialState,
  reducers: {
    setNearbyCategory: (state, action) => {
      state.nearbyCategory = action.payload;
    },

    setNearby: (state, action) => {
      state.nearby = action.payload;
    },
  },
});

export const { setNearbyCategory, setNearby } = useManageNearbySlice.actions;
export default useManageNearbySlice.reducer;

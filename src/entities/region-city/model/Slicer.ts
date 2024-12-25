import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regions: [],
  cities: [],
};

export const useRegionCitySlicer = createSlice({
  name: "useRegionCitySlicer",
  initialState,
  reducers: {
    setRegions: (state, action) => {
      state.regions = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { setRegions, setCities } = useRegionCitySlicer.actions;

export default useRegionCitySlicer.reducer;

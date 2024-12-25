import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  districts: [],
};

export const useManageDistrictSlice = createSlice({
  name: "useManageDistrictSlice",
  initialState,
  reducers: {
    setDistricts: (state, action) => {
      state.districts = action.payload;
    },
  },
});

export default useManageDistrictSlice.reducer;
export const { setDistricts } = useManageDistrictSlice.actions;

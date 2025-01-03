import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  subCategory: [],
};

export const useManageProductServicesSlice = createSlice({
  name: "useManageProductServicesSlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
  },
});

export const { setCategory, setSubCategory } =
  useManageProductServicesSlice.actions;
export default useManageProductServicesSlice.reducer;

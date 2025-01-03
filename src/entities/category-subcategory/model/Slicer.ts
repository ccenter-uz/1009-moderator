import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  subCategory: [],
};

export const useManageCategorySlice = createSlice({
  name: "useManageCategorySlice",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.category = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategory = action.payload;
    },
  },
});

export const { setCategories, setSubCategories } =
  useManageCategorySlice.actions;
export default useManageCategorySlice.reducer;

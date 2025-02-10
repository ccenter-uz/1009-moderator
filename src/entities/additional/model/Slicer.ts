import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  additinalCategories: [],
};

export const useAdditionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    setAdditionalCategories: (state, action) => {
      state.additinalCategories = action.payload;
    },
  },
});

export const { setAdditionalCategories } = useAdditionalSlice.actions;
export default useAdditionalSlice.reducer;

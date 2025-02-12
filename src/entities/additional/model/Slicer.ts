import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  additinalCategories: [],
  additional: [],
};

export const useAdditionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    setAdditionalCategories: (state, action) => {
      state.additinalCategories = action.payload;
    },
    setAdditional: (state, action) => {
      state.additional = action.payload;
    },
  },
});

export const { setAdditionalCategories, setAdditional } =
  useAdditionalSlice.actions;
export default useAdditionalSlice.reducer;

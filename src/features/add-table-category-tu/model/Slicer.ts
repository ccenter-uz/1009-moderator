import { createSlice } from "@reduxjs/toolkit";

export const useAddTableCategoryTuSlice = createSlice({
  name: "useAddTableCategoryTuSlice",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = useAddTableCategoryTuSlice.actions;
export default useAddTableCategoryTuSlice.reducer;

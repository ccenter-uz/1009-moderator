import { createSlice } from "@reduxjs/toolkit";

export const useEditOrgSecondStepSlice = createSlice({
  name: "useEditOrgSecondStepSlice",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { setData } = useEditOrgSecondStepSlice.actions;
export default useEditOrgSecondStepSlice.reducer;

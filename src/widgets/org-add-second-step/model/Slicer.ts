import { createSlice } from "@reduxjs/toolkit";

export const useAddOrgSecondStepSlice = createSlice({
  name: "useAddOrgSecondStepSlice",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { setData } = useAddOrgSecondStepSlice.actions;
export default useAddOrgSecondStepSlice.reducer;

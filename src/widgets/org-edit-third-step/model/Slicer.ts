import { createSlice } from "@reduxjs/toolkit";

export const useEditOrgThirdStepSlice = createSlice({
  name: "useEditOrgThirdStepSlice",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = useEditOrgThirdStepSlice.actions;
export default useEditOrgThirdStepSlice.reducer;

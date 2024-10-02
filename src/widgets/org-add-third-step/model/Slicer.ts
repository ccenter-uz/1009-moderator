import { createSlice } from "@reduxjs/toolkit";

export const useAddOrgThirdStepSlice = createSlice({
  name: "useAddOrgThirdStepSlice",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = useAddOrgThirdStepSlice.actions;
export default useAddOrgThirdStepSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const useEditOrgFirstStepSlice = createSlice({
  name: "useEditOrgFirstStepSlice",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = useEditOrgFirstStepSlice.actions;
export default useEditOrgFirstStepSlice.reducer;

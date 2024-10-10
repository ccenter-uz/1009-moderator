import { createSlice } from "@reduxjs/toolkit";

export const useAddOrgFirstStepSlice = createSlice({
  name: "useAddOrgFirstStepSlice",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = useAddOrgFirstStepSlice.actions;
export default useAddOrgFirstStepSlice.reducer;

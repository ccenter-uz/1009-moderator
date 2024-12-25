import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const useMainOrgSlice = createSlice({
  name: "mainOrgSlice",
  initialState,
  reducers: {
    setMainOrg(state, action) {
      state.data = action.payload;
    },
  },
});

export default useMainOrgSlice.reducer;
export const { setMainOrg } = useMainOrgSlice.actions;

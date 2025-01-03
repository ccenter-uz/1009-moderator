import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  impasses: [],
};

export const useManageImpasseSlice = createSlice({
  name: "useManageImpasseSlice",
  initialState,
  reducers: {
    setImpasses: (state, action) => {
      state.impasses = action.payload;
    },
  },
});

export const { setImpasses } = useManageImpasseSlice.actions;
export default useManageImpasseSlice.reducer;

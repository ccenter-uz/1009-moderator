import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passage: [],
};

export const useManagePassageSlice = createSlice({
  name: "useManagePassageSlice",
  initialState,
  reducers: {
    setPassages: (state, action) => {
      state.passage = action.payload;
    },
  },
});

export default useManagePassageSlice.reducer;
export const { setPassages } = useManagePassageSlice.actions;

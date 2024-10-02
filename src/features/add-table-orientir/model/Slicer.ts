import { createSlice } from "@reduxjs/toolkit";

export const useAddTableOrientirSlice = createSlice({
  name: "useAddTableOrientirSlice",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = useAddTableOrientirSlice.actions;
export default useAddTableOrientirSlice.reducer;

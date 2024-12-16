import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  streets: [],
};

export const useManageStreetsSlice = createSlice({
  name: "streets",
  initialState,
  reducers: {
    setStreets: (state, action) => {
      state.streets = action.payload;
    },
  },
});

export const { setStreets } = useManageStreetsSlice.actions;
export default useManageStreetsSlice.reducer;

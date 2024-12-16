import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areas: [],
};

export const useManageAreaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    setAreas: (state, action) => {
      state.areas = action.payload;
    },
  },
});

export const { setAreas } = useManageAreaSlice.actions;
export default useManageAreaSlice.reducer;

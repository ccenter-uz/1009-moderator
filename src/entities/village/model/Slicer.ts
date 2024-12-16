import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  village: [],
};

export const useManageVillageSlice = createSlice({
  name: "useManageVillageSlice",
  initialState,
  reducers: {
    setVillages: (state, action) => {
      state.village = action.payload;
    },
  },
});

export const { setVillages } = useManageVillageSlice.actions;
export default useManageVillageSlice.reducer;

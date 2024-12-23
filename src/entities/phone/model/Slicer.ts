import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phoneType: [],
};

export const useManagePhoneTypeSlice = createSlice({
  name: "usePhoneTypeSlice",
  initialState,
  reducers: {
    setPhoneType: (state, action) => {
      state.phoneType = action.payload;
    },
  },
});

export const { setPhoneType } = useManagePhoneTypeSlice.actions;
export default useManagePhoneTypeSlice.reducer;

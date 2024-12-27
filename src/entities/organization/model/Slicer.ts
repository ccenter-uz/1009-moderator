import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  organization: [],
};

export const useManageOrgSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization(state, action) {
      state.organization = action.payload;
    },
  },
});

export const { setOrganization } = useManageOrgSlice.actions;
export default useManageOrgSlice.reducer;

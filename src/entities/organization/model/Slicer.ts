import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  organization: [],
  unconfirmedOrganization: [],
};

export const useManageOrgSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization(state, action) {
      state.organization = action.payload;
    },
    setUnconfirmedOrganization(state, action) {
      state.unconfirmedOrganization = action.payload;
    },
  },
});

export const { setOrganization, setUnconfirmedOrganization } =
  useManageOrgSlice.actions;
export default useManageOrgSlice.reducer;

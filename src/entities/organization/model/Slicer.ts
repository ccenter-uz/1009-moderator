import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  organization: [],
  unconfirmedOrganization: [],
  myOrganization: [],
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
    setMyOrganization(state, action) {
      state.myOrganization = action.payload;
    },
  },
});

export const {
  setOrganization,
  setUnconfirmedOrganization,
  setMyOrganization,
} = useManageOrgSlice.actions;
export default useManageOrgSlice.reducer;

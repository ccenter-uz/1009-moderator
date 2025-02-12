import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersMonitoring: [],
  organizationsMonitoring: [],
  transactionsMonitoring: [],
};

export const useMonitoringSlice = createSlice({
  name: "monitoring",
  initialState,
  reducers: {
    setUsersMonitoring: (state, action) => {
      state.usersMonitoring = action.payload;
    },
    setOrganizationsMonitoring: (state, action) => {
      state.organizationsMonitoring = action.payload;
    },
    setTransactionsMonitoring: (state, action) => {
      state.transactionsMonitoring = action.payload;
    },
  },
});

export const {
  setUsersMonitoring,
  setOrganizationsMonitoring,
  setTransactionsMonitoring,
} = useMonitoringSlice.actions;
export default useMonitoringSlice.reducer;

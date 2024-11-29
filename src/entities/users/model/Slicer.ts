import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  roles: [],
};

export const useManageUsersSlice = createSlice({
  name: "useManageUsersSlice",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export default useManageUsersSlice.reducer;
export const { setUsers, setRoles } = useManageUsersSlice.actions;

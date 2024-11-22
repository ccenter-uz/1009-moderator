import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const useManageUsersSlice = createSlice({
  name: "useManageUsersSlice",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default useManageUsersSlice.reducer;
export const { setUsers } = useManageUsersSlice.actions;

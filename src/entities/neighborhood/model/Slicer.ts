import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  neighborhood: [],
};

export const useManageNeighborhoodSlice = createSlice({
  name: "useManageNeighborhoodSlice",
  initialState,
  reducers: {
    setNeighborhoods: (state, action) => {
      state.neighborhood = action.payload;
    },
  },
});

export const { setNeighborhoods } = useManageNeighborhoodSlice.actions;
export default useManageNeighborhoodSlice.reducer;

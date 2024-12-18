import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  residentialArea: [],
};

export const useManageResidentialAreaSlice = createSlice({
  name: "useManageResidentialAreaSlice",
  initialState,
  reducers: {
    setResidentialAreas: (state, action) => {
      state.residentialArea = action.payload;
    },
  },
});

export const { setResidentialAreas } = useManageResidentialAreaSlice.actions;
export default useManageResidentialAreaSlice.reducer;

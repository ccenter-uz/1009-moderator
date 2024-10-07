import { createSlice } from "@reduxjs/toolkit";
import { UploadFile } from "antd";

const initialState: { data: UploadFile[] } = {
  data: [],
};

export const useAddOrgFourthStepSlice = createSlice({
  name: "useAddOrgFourthStepSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = useAddOrgFourthStepSlice.actions;
export default useAddOrgFourthStepSlice.reducer;

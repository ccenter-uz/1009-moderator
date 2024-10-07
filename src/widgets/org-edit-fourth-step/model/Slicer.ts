import { createSlice } from "@reduxjs/toolkit";
import { UploadFile } from "antd";

const initialState: { data: UploadFile[] } = {
  data: [],
};

export const useEditOrgFourthStepSlice = createSlice({
  name: "useEditOrgFourthStepSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = useEditOrgFourthStepSlice.actions;
export default useEditOrgFourthStepSlice.reducer;

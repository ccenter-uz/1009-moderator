import { createSlice } from "@reduxjs/toolkit";
import { UploadFile } from "antd";

const initialState: {
  data: UploadFile[];
  pictures: { id: number | string }[];
} = {
  data: [],
  pictures: [],
};

export const useEditOrgFourthStepSlice = createSlice({
  name: "useEditOrgFourthStepSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setPictures: (state, action) => {
      state.pictures = action.payload;
    },
  },
});

export const { setData, setPictures } = useEditOrgFourthStepSlice.actions;
export default useEditOrgFourthStepSlice.reducer;

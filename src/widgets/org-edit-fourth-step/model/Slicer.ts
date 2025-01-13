import { createSlice } from "@reduxjs/toolkit";
import { UploadFile } from "antd";

const initialState: {
  data: UploadFile[];
  pictures: { id: number | string }[];
  allDay: boolean;
  allType: boolean;
  noDayoffs: boolean;
  withoutLunch: boolean;
} = {
  data: [],
  pictures: [],
  allDay: false,
  allType: false,
  noDayoffs: false,
  withoutLunch: false,
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
    setEditAllDay: (state, action) => {
      state.allDay = action.payload;
    },
    setEditAllType: (state, action) => {
      state.allType = action.payload;
    },
    setEditNoDayoffs: (state, action) => {
      state.noDayoffs = action.payload;
    },
    setEditWithoutLunch: (state, action) => {
      state.withoutLunch = action.payload;
    },
  },
});

export const {
  setData,
  setPictures,
  setEditAllDay,
  setEditAllType,
  setEditNoDayoffs,
  setEditWithoutLunch,
} = useEditOrgFourthStepSlice.actions;
export default useEditOrgFourthStepSlice.reducer;

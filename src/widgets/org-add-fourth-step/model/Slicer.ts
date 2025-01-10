import { createSlice } from "@reduxjs/toolkit";
import { UploadFile } from "antd";

const initialState: {
  data: UploadFile[];
  allType: boolean;
  allDay: boolean;
  noDayoffs: boolean;
  withoutLunch: boolean;
} = {
  data: [],
  allType: false,
  allDay: false,
  noDayoffs: false,
  withoutLunch: false,
};

export const useAddOrgFourthStepSlice = createSlice({
  name: "useAddOrgFourthStepSlice",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setAllType: (state, action) => {
      state.allType = action.payload;
    },
    setAllDay: (state, action) => {
      state.allDay = action.payload;
    },
    setNoDayoffs: (state, action) => {
      state.noDayoffs = action.payload;
    },
    setWithoutLunch: (state, action) => {
      state.withoutLunch = action.payload;
    },
  },
});

export const { setData, setAllType, setAllDay, setNoDayoffs, setWithoutLunch } =
  useAddOrgFourthStepSlice.actions;
export default useAddOrgFourthStepSlice.reducer;

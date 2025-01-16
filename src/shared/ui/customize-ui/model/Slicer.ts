import { createSlice } from "@reduxjs/toolkit";

import { getLocalStorage } from "@shared/lib/helpers";

const initialState = {
  uiSettings: {
    fontSize: getLocalStorage("ui-settings")?.fontSize || 14,
    fontWeight: getLocalStorage("ui-settings")?.fontWeight || 600,
    componentSize: getLocalStorage("ui-settings")?.componentSize || "middle",
    borderWidth: getLocalStorage("ui-settings")?.borderWidth || 1,
    currentColor: getLocalStorage("ui-settings")?.currentColor || "#1677FF",
  },
};

export const CustomizeUISlicer = createSlice({
  name: "CustomizeUISlicer",
  initialState,
  reducers: {
    setUiSettings: (state, action) => {
      state.uiSettings = action.payload;
    },
  },
});

export const { setUiSettings } = CustomizeUISlicer.actions;
export default CustomizeUISlicer.reducer;

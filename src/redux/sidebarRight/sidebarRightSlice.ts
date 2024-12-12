import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarRightVisibility: false,
};

const sidebarRightSlice = createSlice({
  name: "sidebarRight",
  initialState,
  reducers: {
    setSidebarRightVisibility: (state, action) => {
      state.sidebarRightVisibility = action.payload;
    },
  },
});

export const {
  setSidebarRightVisibility,
} = sidebarRightSlice.actions;

export default sidebarRightSlice.reducer;

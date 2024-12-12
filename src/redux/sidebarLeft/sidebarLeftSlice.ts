import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarLeftVisibility: true,
  sidebarLeftSmallVisibility: false,
};

const sidebarLeftSlice = createSlice({
  name: "sidebarLeft",
  initialState,
  reducers: {
    setSidebarLeftVisibility: (state, action) => {
      state.sidebarLeftVisibility = action.payload;
    },
    setSidebarLeftSmallVisibility: (state, action) => {
      state.sidebarLeftSmallVisibility = action.payload;
    },
  },
});

export const {
  setSidebarLeftVisibility,
  setSidebarLeftSmallVisibility,
} = sidebarLeftSlice.actions;

export default sidebarLeftSlice.reducer;

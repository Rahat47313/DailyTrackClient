import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibility: false,
};

const sidebarRightSlice = createSlice({
  name: "sidebarRight",
  initialState,
  reducers: {
    setVisibility: (state, action) => {
      state.visibility = action.payload;
    },
  },
});

export const {
  setVisibility,
} = sidebarRightSlice.actions;

export default sidebarRightSlice.reducer;

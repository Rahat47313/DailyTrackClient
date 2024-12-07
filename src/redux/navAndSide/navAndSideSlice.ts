import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navAndSideVisibility: true,
};

const navAndSideSlice = createSlice({
  name: "navAndSide",
  initialState,
  reducers: {
    setNavAndSideVisibility: (state, action) => {
      state.navAndSideVisibility = action.payload;
    },
  },
});

export const {
  setNavAndSideVisibility,
} = navAndSideSlice.actions;

export default navAndSideSlice.reducer;
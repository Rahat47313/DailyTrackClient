import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: "upcoming",
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  setPage,
} = pagesSlice.actions;

export default pagesSlice.reducer;
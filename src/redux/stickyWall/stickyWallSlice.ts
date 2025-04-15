import { createSlice } from "@reduxjs/toolkit";
import type { Note } from "../../types";

const initialState = {
  notes: [] as Note[],
  isLoading: false,
  error: null,
};

const stickyWallSlice = createSlice({
  name: "stickyWall",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNotes, setIsLoading, setError } = stickyWallSlice.actions;

export default stickyWallSlice.reducer;

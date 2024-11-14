import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      id: 1,
      content: "This is a sticky note you can type and edit.",
    },
  ],
};

const stickyWallSlice = createSlice({
  name: "stickyWall",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = stickyWallSlice.actions;

export default stickyWallSlice.reducer;

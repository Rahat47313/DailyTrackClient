import { createSlice } from '@reduxjs/toolkit';

const yourSlice = createSlice({
  name: 'yourSliceName',
  initialState: {
    // define initial state properties here
  },
  reducers: {
    // define reducers here
  },
});

export const { yourAction } = yourSlice.actions;
export default yourSlice.reducer;

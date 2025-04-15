import { createSlice } from '@reduxjs/toolkit';

const tasksCountSlice = createSlice({
  name: 'tasksCount',
  initialState: {
    counts: {} as { [key: string]: number }
  },
  reducers: {
    setTasksCount: (state, action) => {
      state.counts = action.payload;
    },
    updateCategoryCount: (state, action) => {
      const { categoryId, count } = action.payload;
      state.counts[categoryId] = count;
    }
  }
});

export const { setTasksCount, updateCategoryCount } = tasksCountSlice.actions;
export default tasksCountSlice.reducer;
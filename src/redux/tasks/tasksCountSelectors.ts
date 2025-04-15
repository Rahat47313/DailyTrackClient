import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { selectTasks } from './tasksSelectors';

export const selectTasksCount = (state: RootState) => state.tasksCount.counts;

export const selectCategoryTaskCount = createSelector(
  [selectTasks, (categoryId: string) => categoryId],
  (tasks, categoryId) => tasks.filter(task => task.category._id === categoryId).length
);
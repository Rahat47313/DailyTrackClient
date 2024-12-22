import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTasksCount } from './tasksCountSlice';
import axiosInstance from '../../api/axiosConfig';

export const fetchAllTasksCounts = createAsyncThunk(
  'tasks/fetchAllTasksCounts',
  async (_, { dispatch }) => {
    try {
      const { data } = await axiosInstance.get('/tasks');
      const counts = data.reduce((acc, task) => {
        const categoryId = task.category._id;
        acc[categoryId] = (acc[categoryId] || 0) + 1;
        return acc;
      }, {});
      dispatch(setTasksCount(counts));
    } catch (error) {
      console.error('Error fetching tasks counts:', error);
    }
  }
);
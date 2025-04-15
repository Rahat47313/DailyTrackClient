import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTasksCount } from './tasksCountSlice';
import axiosInstance from '../../utils/axiosConfig';

export const fetchAllTasksCounts = createAsyncThunk(
  'tasks/fetchAllTasksCounts',
  async (_, { dispatch }) => {
    try {
      const { data } = await axiosInstance.get('/tasks');
      interface Task {
        category: {
          _id: string;
        };
      }

      interface TaskCounts {
        [categoryId: string]: number;
      }

      const counts: TaskCounts = data.reduce((acc: TaskCounts, task: Task) => {
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
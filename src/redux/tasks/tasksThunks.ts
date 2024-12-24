import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import { setTasks, setIsLoading, setError } from './tasksSlice';
import { fetchAllTasksCounts } from './tasksCountThunks';

export const fetchAllUpcomingTasks = createAsyncThunk(
  'tasks/fetchAllUpcomingTasks',
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get('/tasks');
      dispatch(setTasks(data));
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const fetchTasksByCategory = createAsyncThunk(
  'tasks/fetchTasksByCategory',
  async (categoryId: string, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get(`/tasks/category/${categoryId}`);
      dispatch(setTasks(data));
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: { title: string, description: string, dueDate: string, categoryId: string, subtasks: any[] }, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.post('/tasks', taskData);
      await dispatch(fetchTasksByCategory(taskData.categoryId));
      await dispatch(fetchAllTasksCounts()); 
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates, categoryId }: { id: string, updates: any, categoryId: string }, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.patch(`/tasks/${id}`, updates);
      await dispatch(fetchTasksByCategory(categoryId));
      await dispatch(fetchAllTasksCounts());
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ id, categoryId }: { id: string, categoryId: string }, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      await dispatch(fetchTasksByCategory(categoryId));
      await dispatch(fetchAllTasksCounts());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import { setTasks, setIsLoading, setError } from './tasksSlice';

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
      dispatch(fetchTasksByCategory(taskData.categoryId));
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
      dispatch(fetchTasksByCategory(categoryId));
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
      dispatch(fetchTasksByCategory(categoryId));
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import { setUsers, setIsLoading, setError } from './usersSlice';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get('/admin/users');
      dispatch(setUsers(data));
      return data;
    } catch (error: any) {
      const message = error.response?.data?.error || error.message;
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: { name: string; email: string; password: string; userType: string }, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      await axiosInstance.post('/admin/users', userData);
      dispatch(fetchUsers());
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      dispatch(fetchUsers());
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
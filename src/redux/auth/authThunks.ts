import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import { setUser, setToken, setIsLoading, setError } from './authSlice';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.post('/auth/login', credentials);
      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
      return data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
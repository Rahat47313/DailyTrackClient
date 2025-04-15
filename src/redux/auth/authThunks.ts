import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';
import { setUser, setToken, logout, setIsLoading, setError } from './authSlice';
import { setNavAndSideVisibility } from '../navAndSide/navAndSideSlice';

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
      let errorMessage = "Error in login of authThunks";
      if(error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      alert(error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      // Clear auth state
      dispatch(logout());
      // Hide nav and sidebar
      dispatch(setNavAndSideVisibility(false));
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
);
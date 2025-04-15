import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import { setCategories, setIsLoading, setError } from "./categoriesSlice";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get("/tasks/categories");
      dispatch(setCategories(data));
    } catch (error) {
      let errorMessage = "Error in fetchCategories of categoriesThunks";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (name: string, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.post("/tasks/categories", {
        name,
        color: "bg-gray-500"
      });
      dispatch(fetchCategories());
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

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, name }: { id: string; name: string }, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.patch(`/tasks/categories/${id}`, { name });
      dispatch(fetchCategories());
      return data;
    } catch (error) {
      let errorMessage = "Error in updateCategory of categoriesThunks";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      await axiosInstance.delete(`/tasks/categories/${id}`);
      dispatch(fetchCategories());
    } catch (error) {
      let errorMessage = "Error in deleteCategory of categoriesThunks";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
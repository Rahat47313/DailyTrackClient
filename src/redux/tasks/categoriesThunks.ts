import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosConfig";
import { setCategories, setIsLoading, setError } from "./categoriesSlice";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get("/tasks/categories");
      dispatch(setCategories(data));
    } catch (error) {
      dispatch(setError(error));
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
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
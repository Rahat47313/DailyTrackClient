import { createAsyncThunk } from "@reduxjs/toolkit";
import { setNotes, setIsLoading, setError } from "./stickyWallSlice";
import axiosInstance from "../../api/axiosConfig";

export const fetchNotes = createAsyncThunk(
  "stickyWall/fetchNotes",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get('/notes');
      dispatch(setNotes(data));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
  
  export const createNote = createAsyncThunk(
    "stickyWall/createNote",
    async (content: string, { dispatch }) => {
      dispatch(setIsLoading(true));
      try {
        const { data } = await axiosInstance.post('/notes', {
          content: content || "New note"
        });
        return data;
      } catch (error) {
        dispatch(setError(error));
        throw error;
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  );
  
  export const updateNote = async (id: string, content: string) => {
    const { data } = await axiosInstance.patch(`/notes/${id}`, { content });
    return data;
  };
  
  export const deleteNote = async (id: string) => {
    const { data } = await axiosInstance.delete(`/notes/${id}`);
    return data;
  };
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTasks } from "../calendar/calendarThunks";

interface TasksState {
  tasks: any[];
  isLoading: boolean;
  isRefreshing: boolean; // Add new state for background updates
  error: null | string;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    startRefresh: (state) => {
      state.isRefreshing = true;
    },
    endRefresh: (state) => {
      state.isRefreshing = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isRefreshing = false;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isRefreshing = false;
      });
  },
});
export const { setTasks, setIsLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { SelectedTaskInterface } from "../../types";

const initialState: SelectedTaskInterface = {
  selectedTask: null,
};

const selectedTaskSlice = createSlice({
  name: "selectedTask",
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
    updateSelectedTaskField: (state, action) => {
      if (state.selectedTask) {
        state.selectedTask = {
          ...state.selectedTask,
          ...action.payload
        };
      }
    },
    toggleSubtaskComplete: (state, action) => {
      if (state.selectedTask) {
        const subtask = state.selectedTask.subtasks.find(st => st._id === action.payload);
        if (subtask) {
          subtask.completed = !subtask.completed;
        }
      }
    }
  },
});

export const { 
  setSelectedTask, 
  clearSelectedTask,
  updateSelectedTaskField,
  toggleSubtaskComplete 
} = selectedTaskSlice.actions;
export default selectedTaskSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface SubtaskInterface {
  _id?: string; // MongoDB ID
  title: string;
  completed: boolean;
}

interface CategoryInterface {
  _id: string; // MongoDB ID
  name: string;
  color: string;
}

interface SelectedTaskInterface {
  selectedTask: {
    _id?: string; // MongoDB ID
    title: string;
    description?: string;
    dueDate: Date;
    subtasks: SubtaskInterface[];
    completed: boolean;
    category: CategoryInterface;
    createdAt?: Date; // From timestamps
    updatedAt?: Date; // From timestamps
  } | null;
}

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

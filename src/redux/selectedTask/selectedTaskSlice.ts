import { createSlice } from "@reduxjs/toolkit";

interface SelectedTaskInterface {
  selectedTask: {
    id: number;
    title: string;
    dueDate: string;
    subtasks: {
      id: string;
      title: string;
      completed: boolean;
    }[];
    category: {
      name: string;
      color: string;
    };
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
  },
});

export const { setSelectedTask, clearSelectedTask } = selectedTaskSlice.actions;
export default selectedTaskSlice.reducer;

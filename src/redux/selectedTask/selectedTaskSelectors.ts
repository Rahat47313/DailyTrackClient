import { RootState } from "../store";
export const selectSelectedTask = (state: RootState) => state.selectedTask.selectedTask;
import { RootState } from "../store";

export const selectNotes = (state: RootState) => state.stickyWall.notes;
export const selectIsLoading = (state: RootState) => state.stickyWall.isLoading;
export const selectError = (state: RootState) => state.stickyWall.error;
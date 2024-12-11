import { RootState } from '../store';

export const selectClockingInTime = (state: RootState) => state.attendance.clockingInTime;
export const selectClockingOutTime = (state: RootState) => state.attendance.clockingOutTime;
export const selectIsLoading = (state: RootState) => state.attendance.isLoading;
export const selectError = (state: RootState) => state.attendance.error;
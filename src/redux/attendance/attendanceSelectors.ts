import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectClockingInTime = (state: RootState) =>
  state.attendance.clockingInTime;
export const selectClockingOutTime = (state: RootState) =>
  state.attendance.clockingOutTime;
export const selectIsLoading = (state: RootState) => state.attendance.isLoading;
export const selectError = (state: RootState) => state.attendance.error;

export const selectNavigationDateString = (state: RootState) => state.attendance.navigationDate;
// export const selectNavigationDate = createSelector(
//   [(state: RootState) => state.attendance.navigationDate],
//   (navigationDate) => new Date(navigationDate)
// );

export const selectAttendanceState = (state: RootState) => state.attendance;
export const selectAttendanceData = createSelector(
  [selectAttendanceState],
  (state) => state.attendanceData
);

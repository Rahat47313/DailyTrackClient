import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendanceRecord } from "../../types";

interface AttendanceState {
  clockingInTime: string | null;
  clockingOutTime: string | null;
  isLoading: boolean;
  error: string | null;
  attendanceData: {
    [userId: string]: AttendanceRecord;
  };
  navigationDate: string;
}

const initialState: AttendanceState = {
  clockingInTime: null,
  clockingOutTime: null,
  isLoading: false,
  error: null,
  attendanceData: {},
  navigationDate: new Date().toISOString(),
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setClockingInTime: (state, action: PayloadAction<string>) => {
      state.clockingInTime = action.payload;
    },
    setClockingOutTime: (state, action: PayloadAction<string>) => {
      state.clockingOutTime = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAttendanceData: (state, action: PayloadAction<any>) => {
      state.attendanceData = action.payload;
    },
    setNavigationDate: (state, action: PayloadAction<string>) => {
      state.navigationDate = action.payload;
    },
  },
});

export const {
  setClockingInTime,
  setClockingOutTime,
  setIsLoading,
  setError,
  setAttendanceData,
  setNavigationDate,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;

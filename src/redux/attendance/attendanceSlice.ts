import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AttendanceState {
  clockingInTime: string | null;
  clockingOutTime: string | null;
  isLoading: boolean;
  error: string | null;
  attendanceData: {
    [year: string]: {
      [month: string]: {
        [day: string]: {
          status: string;
          clockInTime: string | null;
          clockOutTime: string | null;
        };
      };
    };
  };
}

const initialState: AttendanceState = {
  clockingInTime: null,
  clockingOutTime: null,
  isLoading: false,
  error: null,
  attendanceData: {},
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
  },
});

export const {
  setClockingInTime,
  setClockingOutTime,
  setIsLoading,
  setError,
  setAttendanceData,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setClockingInTime,
  setClockingOutTime,
  setIsLoading,
  setError,
  setAttendanceData,
} from "./attendanceSlice";
import axiosInstance from "../../utils/axiosConfig";
import { RootState } from "../store";

export const fetchAttendanceData = createAsyncThunk(
  "attendance/fetchData",
  async (year: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    // Only fetch if we don't have data for this year
    if (state.attendance.attendanceData[year]) {
      return state.attendance.attendanceData;
    }

    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get(`/attendance/${year}`);

      if (!data) {
        return state.attendance.attendanceData; // Keep existing data
      }

      dispatch(setAttendanceData(data));
      return data;
    } catch (error: any) {
      const message = error.response?.data?.error || error.message;
      console.error("In attendanceThunks; Error fetching attendance data:", message);
      dispatch(setError(message));
      // dispatch(setAttendanceData({}));
      return state.attendance.attendanceData; 
    } finally {
      dispatch(setIsLoading(false));
    }
  },
  {
    condition: (_, { getState }) => {
      const { attendance } = getState() as RootState;
      return !attendance.isLoading;
    }
  }
);

// export const fetchAttendanceData = createAsyncThunk(
//   "attendance/fetchData",
//   async (year: string, { dispatch }) => {
//     dispatch(setIsLoading(true));
//     try {
//       const { data } = await axiosInstance.get(`/attendance/${year}`);

//       const formattedData = data.reduce((acc, record: AttendanceRecord) => {
//         acc[record._id] = {
//           years: record.years,
//           user: record.user
//         };
//         return acc;
//       }, {});

//       dispatch(setAttendanceData(formattedData));
//       return formattedData;
//     } catch (error) {
//       console.error("Error fetching attendance data:", error);
//       dispatch(setError(error.message));
//       dispatch(setAttendanceData({}));
//       throw error;
//     } finally {
//       dispatch(setIsLoading(false));
//     }
//   }
// );

export const clockIn = createAsyncThunk(
  "attendance/clockIn",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now
        .toLocaleString("default", { month: "short" })
        .toUpperCase();
      const day = now.getDate();
      const time = now.toLocaleTimeString();

      await axiosInstance.post(`/attendance/${year}/${month}/${day}/clockin`);
      dispatch(setClockingInTime(time));
      // Fetch updated data
      await dispatch(fetchAttendanceData(year.toString()));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const clockOut = createAsyncThunk(
  "attendance/clockOut",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now
        .toLocaleString("default", { month: "short" })
        .toUpperCase();
      const day = now.getDate();
      const time = now.toLocaleTimeString();

      await axiosInstance.post(`/attendance/${year}/${month}/${day}/clockout`);
      dispatch(setClockingOutTime(time));
      // Fetch updated data
      await dispatch(fetchAttendanceData(year.toString()));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

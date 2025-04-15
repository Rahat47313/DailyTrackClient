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

const getBSTDate = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka"
  });
};

const getBSTTime = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export const fetchAttendanceData = createAsyncThunk(
  "attendance/fetchData",
  async (year: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    // Only fetch if we don't have data for this year
    // if (state.attendance.attendanceData[year]) {
    //   return state.attendance.attendanceData;
    // }

    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get(`/attendance/${year}`);

      if (!data || Object.keys(data).length === 0) {
        return state.attendance.attendanceData; // Keep existing data
      }

      dispatch(setAttendanceData(data));
      return data;
    } catch (error: any) {
      const message = error.response?.data?.error || error.message;
      console.error(
        "In attendanceThunk, Error fetching attendance data:",
        message
      );
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
    },
  }
);

export const clockIn = createAsyncThunk(
  "attendance/clockIn",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const bstDate = new Date(getBSTDate()); 
      const year = bstDate.getFullYear();
      const month = bstDate.toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        month: "short"
      }).toUpperCase();
      const day = bstDate.getDate();
      const time = getBSTTime();

      await axiosInstance.post(`/attendance/${year}/${month}/${day}/clockin`);
      dispatch(setClockingInTime(time));
      // Fetch updated data
      await dispatch(fetchAttendanceData(year.toString()));
    } catch (error) {
      let errorMessage = "Error in clockIn of attendanceThunks";
      if(error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
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
      const bstDate = new Date(getBSTDate());
      const year = bstDate.getFullYear();
      const month = bstDate.toLocaleString("en-US", {
        timeZone: "Asia/Dhaka", 
        month: "short"
      }).toUpperCase();
      const day = bstDate.getDate();
      const time = getBSTTime();

      await axiosInstance.post(`/attendance/${year}/${month}/${day}/clockout`);
      dispatch(setClockingOutTime(time));
      // Fetch updated data
      await dispatch(fetchAttendanceData(year.toString()));
    } catch (error) {
      let errorMessage = "Error in clockOut of attendanceThunks";
      if(error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

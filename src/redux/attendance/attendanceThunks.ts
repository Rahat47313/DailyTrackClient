import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setClockingInTime,
  setClockingOutTime,
  setIsLoading,
  setError,
  setAttendanceData,
} from "./attendanceSlice";
import axiosInstance from "../../utils/axiosConfig";

export const fetchAttendanceData = createAsyncThunk(
  "attendance/fetchData",
  async (year: string, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get(`/attendance/${year}`);
      // Transform the data structure to match what PersonalAttendanceGrid expects
      const formattedData = data?.attendance?.[year]?.months || {};
      dispatch(setAttendanceData({ [year]: formattedData }));
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      dispatch(setError(error.message));
      dispatch(setAttendanceData({}));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

// export const fetchPersonalAttendance = createAsyncThunk(
//   "attendance/fetchPersonal",
//   async (year: string, { dispatch }) => {
//     dispatch(setIsLoading(true));
//     try {
//       const { data } = await axiosInstance.get(`/attendance/personal/${year}`);
//       dispatch(setPersonalAttendanceData(data));
//     } catch (error) {
//       dispatch(setError(error.message));
//     } finally {
//       dispatch(setIsLoading(false));
//     }
//   }
// );

// export const fetchOfficeAttendance = createAsyncThunk(
//   "attendance/fetchOffice",
//   async (year: string, { dispatch }) => {
//     dispatch(setIsLoading(true));
//     try {
//       const { data } = await axiosInstance.get(`/attendance/office/${year}`);
//       dispatch(setOfficeAttendanceData(data));
//     } catch (error) {
//       dispatch(setError(error.message));
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

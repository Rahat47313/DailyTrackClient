import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendarView: "year",
  currentDate: new Date().toISOString(),
  events: [],
  isLoading: false,
  error: null,
  isAuthenticated: false,
  months: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarView: (state, action) => {
      state.calendarView = action.payload;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setMonths: (state, action) => {
      state.months = action.payload;
    },
  },
});

export const {
  setCalendarView,
  setCurrentDate,
  setEvents,
  setIsLoading,
  setError,
  setIsAuthenticated,
  setMonths,
} = calendarSlice.actions;

export default calendarSlice.reducer;
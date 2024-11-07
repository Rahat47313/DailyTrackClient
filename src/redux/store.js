import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendar/calendarSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export default store;

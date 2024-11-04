import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './slices/calendarSlice';

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export default store
import { configureStore } from '@reduxjs/toolkit';
import yourReducer from './slices/mySlice';

const store = configureStore({
  reducer: {
    yourSliceName: yourReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendar/calendarSlice";
import pagesReducer from "./pages/pagesSlice"
import sidebarRightReducer from "./sidebarRight/sidebarRightSlice"
import stickyWallReducer from "./stickyWall/stickyWallSlice"
import navAndSideReducer from "./navAndSide/navAndSideSlice"
import attendanceReducer from './attendance/attendanceSlice';

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    pages: pagesReducer,
    sidebarRight: sidebarRightReducer,
    stickyWall: stickyWallReducer,
    navAndSide: navAndSideReducer,
    attendance: attendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
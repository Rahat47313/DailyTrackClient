import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendar/calendarSlice";
import pagesReducer from "./pages/pagesSlice"
import sidebarRightReducer from "./sidebarRight/sidebarRightSlice"
import stickyWallReducer from "./stickyWall/stickyWallSlice"

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    pages: pagesReducer,
    sidebarRight: sidebarRightReducer,
    stickyWall: stickyWallReducer,
  },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendar/calendarSlice";
import pagesReducer from "./pages/pagesSlice"
import sidebarRightReducer from "./sidebarRight/sidebarRightSlice"
import stickyWallReducer from "./stickyWall/stickyWallSlice"
import navAndSideReducer from "./navAndSide/navAndSideSlice"

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    pages: pagesReducer,
    sidebarRight: sidebarRightReducer,
    stickyWall: stickyWallReducer,
    navAndSide: navAndSideReducer,
  },
});

export default store;
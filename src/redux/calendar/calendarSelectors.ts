import { createSelector } from "@reduxjs/toolkit";
import { selectTasks } from "../tasks/tasksSelectors";
import { convertTaskToEvent } from "../../utils/calendarUtils";
import { RootState } from "../store";

const selectCalendarState = (state: RootState) => state.calendar;

export const selectCalendarView = createSelector(
  [selectCalendarState],
  (calendar) => calendar.calendarView
);
export const selectCurrentDateString = (state: RootState) =>
  state.calendar.currentDate;
export const selectCurrentMonth = createSelector(
  [selectCalendarState],
  (calendar) => calendar.currentMonth
);
export const selectCurrentYear = createSelector(
  [selectCalendarState],
  (calendar) => calendar.currentYear
);
export const selectNavigationDate = createSelector(
  [selectCalendarState],
  (calendar) => new Date(calendar.navigationDate)
);
export const selectEvents = createSelector(
  [selectCalendarState],
  (calendar) => calendar.events
);

export const selectEventsAndTasks = createSelector(
  [selectEvents, selectTasks],
  (events, tasks) => {
    const taskEvents = tasks.map(convertTaskToEvent);
    return [...events, ...taskEvents];
  }
);

export const selectIsLoading = createSelector(
  [selectCalendarState],
  (calendar) => calendar.isLoading
);
export const selectError = createSelector(
  [selectCalendarState],
  (calendar) => calendar.error
);
export const selectIsAuthenticated = createSelector(
  [selectCalendarState],
  (calendar) => calendar.isAuthenticated
);
export const selectMonths = createSelector(
  [selectCalendarState],
  (calendar) => calendar.months
);
export const selectDays = createSelector(
  [selectCalendarState],
  (calendar) => calendar.days
);

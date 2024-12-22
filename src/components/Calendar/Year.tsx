import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDays,
  selectMonths,
  selectNavigationDate,
  selectIsAuthenticated,
} from "../../redux/calendar/calendarSelectors";
import { selectEventsAndTasks } from '../../redux/calendar/calendarSelectors';
import { setMonths } from "../../redux/calendar/calendarSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const isCurrentDate = (date) => {
  const currentDate = new Date();
  return (
    currentDate.getFullYear() === date.getFullYear() &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getDate() === date.getDate()
  );
};

const isCurrentMonth = (date) => {
  const currentDate = new Date();
  return (
    currentDate.getFullYear() === date.getFullYear() &&
    currentDate.getMonth() === date.getMonth()
  );
};

export default function Year() {
  const dispatch = useDispatch();
  const months = useSelector(selectMonths) || [];
  const navigationDate = useSelector(selectNavigationDate);
  const events = useSelector(selectEventsAndTasks) || [];
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigationYear = navigationDate.getFullYear();

  const generateDaysInMonth = (month, year, monthEvents) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDateOfMonth = lastDayOfMonth.getDate();

    // Fill in the days from the previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevMonthDay = prevMonthLastDay - i;
      const prevMonthDate = new Date(Date.UTC(year, month - 1, prevMonthDay));
      const prevMonthEvents = monthEvents.filter(
        (event) =>
          event.start.date === prevMonthDate.toISOString().split("T")[0] ||
          event.start.dateTime?.split("T")[0] ===
            prevMonthDate.toISOString().split("T")[0]
      );
      days.push({
        date: prevMonthDate.toISOString().split("T")[0],
        dayNumber: prevMonthDay,
        isThisMonth: false,
        isCurrentMonth: isCurrentMonth(prevMonthDate),
        isToday: isCurrentDate(prevMonthDate),
        events: prevMonthEvents,
      });
    }

    // Fill in the days for this month
    for (let day = 1; day <= lastDateOfMonth; day++) {
      const currentDate = new Date(Date.UTC(year, month, day));
      const currentMonthEvents = monthEvents.filter(
        (event) =>
          event.start.date === currentDate.toISOString().split("T")[0] ||
          event.start.dateTime?.split("T")[0] ===
            currentDate.toISOString().split("T")[0]
      );
      days.push({
        date: currentDate.toISOString().split("T")[0],
        dayNumber: day,
        isThisMonth: true,
        isCurrentMonth: isCurrentMonth(currentDate),
        isToday: isCurrentDate(currentDate),
        events: currentMonthEvents,
      });
    }

    // Fill in the remaining days from the next month
    const remainingDays = 42 - days.length; // 6 rows × 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDate = new Date(Date.UTC(year, month + 1, i));
      const nextMonthEvents = monthEvents.filter(
        (event) =>
          event.start.date === nextMonthDate.toISOString().split("T")[0] ||
          event.start.dateTime?.split("T")[0] ===
            nextMonthDate.toISOString().split("T")[0]
      );
      days.push({
        date: nextMonthDate.toISOString().split("T")[0],
        dayNumber: i,
        isThisMonth: false,
        isCurrentMonth: isCurrentMonth(nextMonthDate),
        isToday: isCurrentDate(nextMonthDate),
        events: nextMonthEvents,
      });
    }

    return days;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      console.warn("User is not authenticated, Events will not be fetched");
    }

    const monthsData = Array.from({ length: 12 }, (_, monthIndex) => {
      const monthEvents = events.filter((event) => {
        const eventDate = new Date(event.start.date || event.start.dateTime);
        return (
          eventDate.getFullYear() === navigationYear &&
          (eventDate.getMonth() === monthIndex || // Include events in current month
            eventDate.getMonth() === monthIndex + 1 || // Include events in next month section
            eventDate.getMonth() === monthIndex - 1) // Include events in previous month section
        );
      });

      // Generate days and associate events
      const days = generateDaysInMonth(monthIndex, navigationYear, monthEvents);

      return {
        name: new Date(navigationYear, monthIndex).toLocaleString("default", {
          month: "long",
        }),
        days,
      };
    });

    dispatch(setMonths(monthsData));
  }, [navigationYear, events, dispatch, isAuthenticated]);

  return (
    <div>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
        {months.map((month) => (
          <section key={month.name} className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {month.name}
            </h2>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500 dark:text-gray-400">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-300 dark:bg-gray-600 text-sm shadow ring-1 ring-gray-200 dark:ring-gray-700">
              {month.days.map((day, dayIdx) => (
                <button
                  key={day.date || `empty-${dayIdx}`}
                  type="button"
                  className={classNames(
                    // Current month styling (takes precedence)
                    day.isCurrentMonth
                      ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      : // This month but not current month
                      day.isThisMonth
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : // Adjacent months
                        "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
                    dayIdx === 0 && "rounded-tl-lg",
                    dayIdx === 6 && "rounded-tr-lg",
                    dayIdx === month.days.length - 7 && "rounded-bl-lg",
                    dayIdx === month.days.length - 1 && "rounded-br-lg",
                    "py-1.5 hover:bg-red-300 hover:dark:bg-red-950 focus:z-10"
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isToday &&
                        "bg-gray-900 dark:bg-white font-bold text-lg text-white dark:text-gray-900",
                      "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                    )}
                  >
                    {day.dayNumber}
                  </time>
                  {day.events.length > 0 && (
                    <div className="w-1 h-1 mx-auto mt-1 rounded-full bg-red-600" />
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

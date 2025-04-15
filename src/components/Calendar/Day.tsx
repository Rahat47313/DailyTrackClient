import { Fragment, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import {
  selectDays,
  selectNavigationDate,
  selectIsAuthenticated,
} from "../../redux/calendar/calendarSelectors";
import { fetchEvents } from "../../redux/calendar/calendarThunks";
import { selectEventsAndTasks } from '../../redux/calendar/calendarSelectors';
import { setDays } from "../../redux/calendar/calendarSlice";
import type { WeekDay } from "../../types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Day() {
  const dispatch = useDispatch<AppDispatch>();
  const days = useSelector(selectDays) as WeekDay[];
  const navigationDate = useSelector(selectNavigationDate);
  const events = useSelector(selectEventsAndTasks);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);
  const containerOffset = useRef<HTMLDivElement>(null);

  const generateWeekDays = useCallback((date: string | Date): WeekDay[] => {
    const currentDate = new Date(date);
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return {
        date: day.toISOString(),
        dayName: day.toLocaleDateString("default", { weekday: "short" }),
        dayNumber: day.getDate(),
        isToday: day.toDateString() === new Date().toDateString(),
        dateString: day.toISOString().split("T")[0],
      };
    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(fetchEvents()).catch((error) => {
      console.error("Failed to fetch events", error);
    });
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const weekDays = generateWeekDays(navigationDate);
    dispatch(setDays(weekDays));
  }, [dispatch, generateWeekDays]);

  useEffect(() => {
    // Set the container scroll position based on the current time.
    if (container.current && containerNav.current && containerOffset.current) {
      const currentMinute = new Date().getHours() * 60;
      container.current.scrollTop =
        ((container.current.scrollHeight -
          containerNav.current.offsetHeight -
          containerOffset.current.offsetHeight) *
          currentMinute) /
        1440;
    }
  }, []);

  return (
    <div className="flex h-full flex-col text-gray-900 dark:text-white">
      <div className="isolate flex flex-auto overflow-hidden">
        <div ref={container} className="flex flex-auto flex-col overflow-auto">
          <div
            ref={containerNav}
            className="sticky top-0 z-10 grid flex-none grid-cols-7 text-xs text-gray-500 dark:text-gray-400 shadow ring-1 ring-black dark:ring-white ring-opacity-5 md:hidden"
          >
            {days.map((day) => (
              <button
                key={day.dateString}
                type="button"
                className="flex flex-col items-center pb-1.5 pt-3"
              >
                <span>{day.dayName}</span>
                <span
                  className={classNames(
                    "mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold",
                    day.isToday
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900 dark:text-gray-50"
                  )}
                >
                  {day.dayNumber}
                </span>
              </button>
            ))}
          </div>
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none ring-1 ring-gray-200 dark:ring-gray-700" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200 dark:divide-gray-700"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {Array.from({ length: 24 }, (_, hour) => (
                  <Fragment key={hour}>
                    <div>
                      <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                        {hour === 0
                          ? "12AM"
                          : hour > 12
                          ? `${hour - 12}PM`
                          : `${hour}AM`}
                      </div>
                    </div>
                    <div />
                  </Fragment>
                ))}
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {events.map((event) => {
                  const start = new Date(
                    event.start.dateTime ?? event.start.date ?? new Date()
                  );
                  const end = new Date(event.end.dateTime ?? event.end.date ?? new Date());
                  const isAllDay = !event.start.dateTime;

                  return (
                    <li
                      key={event.id}
                      style={{
                        gridRow: `${
                          isAllDay
                            ? 1
                            : start.getHours() * 12 +
                              Math.floor(start.getMinutes() / 5) +
                              1
                        } / span ${
                          isAllDay
                            ? 288
                            : end.getHours() * 12 +
                              Math.floor(end.getMinutes() / 5) +
                              1 -
                              (start.getHours() * 12 +
                                Math.floor(start.getMinutes() / 5) +
                                1)
                        }`,
                      }}
                      className="relative mt-px flex"
                    >
                      <a
                        href={event.htmlLink}
                        target="_blank"
                        className="group absolute inset-1 rounded-lg text-xs leading-5 bg-gray-100 hover:bg-gray-200 p-2"
                      >
                        <div className="flex flex-col overflow-y-auto">
                          <p className="order-1 font-semibold text-gray-700">
                            {event.summary}
                          </p>
                          <p className="text-gray-500 group-hover:text-gray-700">
                            <time dateTime={start.toISOString()}>
                              {isAllDay
                                ? "All day"
                                : start.toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
                            </time>
                          </p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

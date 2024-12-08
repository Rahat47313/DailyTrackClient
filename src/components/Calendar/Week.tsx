import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNavigationDate,
  selectEvents,
  selectIsAuthenticated,
} from "../../redux/calendar/calendarSelectors";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Generate array of time slots
const TIME_SLOTS = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  displayTime: `${hour === 0 ? "12" : hour > 12 ? hour - 12 : hour}${
    hour >= 12 ? "PM" : "AM"
  }`,
  label: `${hour.toString().padStart(2, "0")}:00`,
}));

export default function Week() {
  const dispatch = useDispatch();
  const navigationDate = useSelector(selectNavigationDate);
  const events = useSelector(selectEvents);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [weekDays, setWeekDays] = useState([]);
  const [weekEvents, setWeekEvents] = useState([]);
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  // Get week days based on navigation date
  const getWeekDays = (date) => {
    const currentDate = new Date(date);
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return {
        date: day,
        dayName: day.toLocaleDateString("default", { weekday: "short" }),
        dayNumber: day.getDate(),
        month: day.toLocaleDateString("default", { month: "long" }),
        isToday: day.toDateString() === new Date().toDateString(),
        dateString: day.toISOString().split("T")[0],
      };
    });
  };

  // Format events for display
  const formatWeekEvents = (events, weekDays) => {
    return events
      .filter((event) => {
        const eventDate = new Date(event.start.dateTime || event.start.date);
        const weekStart = weekDays[0].date;
        const weekEnd = weekDays[6].date;
        weekEnd.setHours(23, 59, 59);
        return eventDate >= weekStart && eventDate <= weekEnd;
      })
      .map((event) => {
        const start = new Date(event.start.dateTime || event.start.date);
        const end = new Date(event.end.dateTime || event.end.date);
        const isAllDay = !event.start.dateTime;

        return {
          id: event.id,
          title: event.summary,
          start,
          end,
          column: start.getDay() + 1,
          startRow: isAllDay
            ? 1
            : start.getHours() * 12 + Math.floor(start.getMinutes() / 5) + 1,
          endRow: isAllDay
            ? 288
            : end.getHours() * 12 + Math.floor(end.getMinutes() / 5) + 1,
          url: event.htmlLink,
          isAllDay,
        };
      });
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const days = getWeekDays(new Date(navigationDate));
    setWeekDays(days);

    const formattedEvents = formatWeekEvents(events, days);
    setWeekEvents(formattedEvents);
  }, [navigationDate, events, isAuthenticated]);

  useEffect(() => {
    // Scroll to current time
    if (container.current) {
      const currentHour = new Date().getHours();
      const scrollPosition = currentHour * 7 * 12;
      container.current.scrollTop = scrollPosition;
    }
  }, []);

  // useEffect(() => {
  //   // Set the container scroll position based on the current time.
  //   const currentMinute = new Date().getHours() * 60;
  //   container.current.scrollTop =
  //     ((container.current.scrollHeight -
  //       containerNav.current.offsetHeight -
  //       containerOffset.current.offsetHeight) *
  //       currentMinute) /
  //     1440;
  // }, []);

  return (
    <div className="flex h-full flex-col">
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none shadow ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 dark:text-gray-400 sm:hidden">
              {weekDays.map((day) => (
                <div
                  key={day.dateString}
                  className="flex flex-col items-center pb-3 pt-2"
                >
                  {day.dayName}{" "}
                  <span
                    className={classNames(
                      day.isToday
                        ? "bg-white text-black"
                        : "text-gray-900 dark:text-white",
                      "mt-1 flex h-8 w-8 items-center justify-center rounded-full font-semibold"
                    )}
                  >
                    {day.dayNumber}
                  </span>
                </div>
              ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-200 dark:divide-gray-700 border-r border-gray-200 dark:border-gray-700 text-sm leading-6 text-gray-500 dark:text-gray-400 sm:grid">
              <div className="col-end-1 w-14" />
              {weekDays.map((day) => (
                <div
                  key={day.dateString}
                  className="flex items-center justify-center py-3"
                >
                  <span
                    className={
                      day.isToday
                        ? "flex items-baseline"
                        : "flex justify-center items-center"
                    }
                  >
                    {day.dayName}{" "}
                    <span
                      className={classNames(
                        day.isToday
                          ? "bg-gray-900 dark:bg-white text-white dark:text-black ml-1.5"
                          : "text-gray-900 dark:text-white",
                        "flex items-center justify-center font-semibold h-8 w-8 rounded-full"
                      )}
                    >
                      {day.dayNumber}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none ring-1 ring-gray-200 dark:ring-gray-700" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines for hours */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200 dark:divide-gray-700"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {TIME_SLOTS.map((slot) => (
                  <Fragment key={slot.hour}>
                    <div>
                      <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                        {slot.displayTime}
                      </div>
                    </div>
                    <div />
                  </Fragment>
                ))}
              </div>

              {/* Vertical lines for days */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-200 dark:divide-gray-700 sm:grid sm:grid-cols-7">
                {weekDays.map((day, i) => (
                  <div
                    key={day.dateString}
                    className={`col-start-${i + 1} row-span-full`}
                  />
                ))}
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {weekEvents.map((event) => (
                  <li
                    key={event.id}
                    className={classNames(
                      "relative mt-px flex",
                      `sm:col-start-${event.column}`
                    )}
                    style={{
                      gridRow: `${event.startRow} / span ${
                        event.endRow - event.startRow
                      }`,
                    }}
                  >
                    <a
                      href={event.url}
                      target="_blank"
                      className={classNames(
                        "group absolute inset-1 rounded-lg p-2 text-xs leading-5",
                        event.isAllDay
                          ? "border-2"
                          : "bg-gray-100 hover:bg-gray-200"
                      )}
                    >
                      <div
                        className={classNames(
                          "flex flex-col overflow-y-auto",
                          event.isAllDay
                            ? "bg-gray-100 hover:bg-gray-200 rounded-lg px-2"
                            : ""
                        )}
                      >
                        <p className="order-1 font-semibold text-gray-700">
                          {event.title}
                        </p>
                        <p className="text-gray-500 group-hover:text-gray-700">
                          <time dateTime={event.start.toISOString()}>
                            {event.isAllDay
                              ? "All day"
                              : event.start.toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                })}
                          </time>
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
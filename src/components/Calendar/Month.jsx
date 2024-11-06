import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { ClockIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const isToday = (date) => {
  const today = new Date();
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

const isCurrentMonth = (date, currentDate) => {
  return (
    currentDate.getFullYear() === date.getFullYear() &&
    currentDate.getMonth() === date.getMonth()
  );
};

const generateDaysInMonth = (month, year) => {
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
    days.push({
      date: prevMonthDate.toISOString().split("T")[0],
      events: [],
      isCurrentMonth: false,
      isToday: isToday(prevMonthDate),
    });
  }

  // Fill in the days for this month
  for (let day = 1; day <= lastDateOfMonth; day++) {
    const currentDate = new Date(Date.UTC(year, month, day));
    days.push({
      date: currentDate.toISOString().split("T")[0],
      events: [],
      isCurrentMonth: true,
      isToday: isToday(currentDate),
    });
  }

  // Fill in the remaining days from the next month
  const remainingDays = 42 - days.length; // 6 rows × 7 days = 42
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDate = new Date(Date.UTC(year, month + 1, i));
    days.push({
      date: nextMonthDate.toISOString().split("T")[0],
      events: [],
      isCurrentMonth: false,
      isToday: isToday(nextMonthDate),
    });
  }

  return days;
};

export default function Month() {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const fetchMonthData = async () => {
      const calendarId = "primary";
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).toISOString();
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).toISOString();

      try {
        const response = await gapi.client.calendar.events.list({
          calendarId,
          timeMin: startDate,
          timeMax: endDate,
          showDeleted: false,
          singleEvents: true,
          orderBy: "startTime",
        });

        const events = response.result.items;
        const days = generateDaysInMonth(
          currentDate.getMonth(),
          currentDate.getFullYear()
        );

        // Add events to corresponding days
        events?.forEach((event) => {
          const eventDate =
            event.start.date || event.start.dateTime.split("T")[0];
          const day = days.find((day) => day.date === eventDate);
          if (day) {
            day.events.push({
              id: event.id,
              name: event.summary,
              time: new Date(
                event.start.dateTime || event.start.date
              ).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              }),
              datetime: event.start.dateTime || event.start.date,
              href: event.htmlLink,
            });
          }
        });

        setDays(days);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchMonthData();
  }, [currentDate]);

  return (
    <div className="bg-gradient-to-t from-gray-100 dark:from-gray-700 to-transparent rounded-md lg:invisible">
      <div className="flex h-full flex-col text-gray-900 dark:text-white lg:visible">
        <div className="shadow ring-1 ring-black ring-opacity-5 flex flex-auto flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 dark:border-gray-600 text-center text-md font-semibold leading-6 text-gray-700 dark:text-gray-200 lg:flex-none">
            <div className="py-2">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
            <div className="py-2">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="py-2">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="py-2">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="py-2">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="py-2">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="py-2">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
          </div>
          <div className="flex bg-gray-300 dark:bg-gray-600 text-md leading-6 text-gray-700 dark:text-gray-200 flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {days.map((day) => (
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
                    "relative px-3 py-2 hover:bg-red-300 hover:dark:bg-red-950"
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isToday
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-50 font-semibold text-white dark:text-black"
                        : undefined,
                      "block"
                    )}
                  >
                    {day.date.split("-").pop().replace(/^0/, "")}
                  </time>
                  {day.events.length > 0 && (
                    <ol className="mt-2">
                      {day.events.slice(0, 2).map((event) => (
                        <li key={event.id}>
                          <a href={event.href} className="group flex">
                            <p className="flex-auto truncate font-medium text-gray-900 dark:text-white group-hover:text-red-900 group-hover:dark:text-red-200">
                              {event.name}
                            </p>
                            <time
                              dateTime={event.datetime}
                              className="ml-3 hidden flex-none text-gray-900 dark:text-white group-hover:text-red-900 group-hover:dark:text-red-200 xl:block"
                            >
                              {event.time}
                            </time>
                          </a>
                        </li>
                      ))}
                      {day.events.length > 2 && (
                        <li className="text-gray-500 dark:text-gray-400">
                          + {day.events.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {days.map((day) => (
                <button
                  key={day.date}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    day.isCurrentMonth
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
                    (day === selectedDay || day.isToday) && "font-semibold",
                    day === selectedDay && "text-white dark:text-black",
                    !selectedDay && day.isToday && "text-red-500",
                    !selectedDay &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-700 dark:text-gray-200",
                    !selectedDay &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-500",
                    "flex h-14 flex-col px-3 py-2 hover:bg-red-300 hover:dark:bg-red-950 focus:z-10"
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day === selectedDay &&
                        "flex h-7 w-7 ring-2 ring-inset ring-red-500 items-center justify-center rounded-full",
                      day === selectedDay &&
                        day.isToday &&
                        "bg-gray-900 dark:bg-white",
                      day === selectedDay && !day.isToday && "bg-red-500",
                      "ml-auto"
                    )}
                  >
                    {day.date.split("-").pop().replace(/^0/, "")}
                  </time>
                  <span className="sr-only">{day.events.length} events</span>
                  {day.events.length > 0 && (
                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      {day.events.map((event) => (
                        <span
                          key={event.id}
                          className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-red-600"
                        />
                      ))}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedDay?.events.length > 0 && (
          <div className="px-4 py-10 sm:px-6 lg:hidden">
            <ol className="divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-sm shadow ring-1 ring-black ring-opacity-5">
              {selectedDay.events.map((event) => (
                <li
                  key={event.id}
                  className="group flex p-4 pr-6 focus-within:bg-gray-50 dark:focus-within:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <div className="flex-auto">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {event.name}
                    </p>
                    <time
                      dateTime={event.datetime}
                      className="mt-2 flex items-center text-gray-700 dark:text-gray-200"
                    >
                      <ClockIcon
                        className="mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {event.time}
                    </time>
                  </div>
                  <a
                    href={event.href}
                    className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                  >
                    Edit<span className="sr-only">, {event.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

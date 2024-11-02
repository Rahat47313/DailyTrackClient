import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

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

const isCurrentMonth = (date) => {
  const currentMonth = new Date();
  return (
    currentMonth.getFullYear() === date.getFullYear() &&
    currentMonth.getMonth() === date.getMonth()
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
    const prevMonthDate = new Date(year, month - 1, prevMonthDay);
    days.push({
      date: prevMonthDate.toISOString().split("T")[0],
      dayNumber: prevMonthDay,
      isThisMonth: false,
      isCurrentMonth: false, //isCurrentMonth(prevMonthDate),
      isToday: false, //isToday(prevMonthDate),
      events: [],
    });
  }

  // Fill in the days for this month
  for (let day = 1; day <= lastDateOfMonth; day++) {
    const currentDate = new Date(year, month, day);
    days.push({
      date: currentDate.toISOString().split("T")[0],
      dayNumber: day,
      isThisMonth: true,
      isCurrentMonth: isCurrentMonth(currentDate),
      isToday: isToday(currentDate),
      events: [],
    });
  }

  // Fill in the remaining days from the next month
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDate = new Date(year, month + 1, i);
    days.push({
      date: nextMonthDate.toISOString().split("T")[0],
      dayNumber: i,
      isThisMonth: false,
      isCurrentMonth: false, //isCurrentMonth(nextMonthDate),
      isToday: false, //isToday(nextMonthDate),
      events: [],
    });
  }

  return days;
};

export default function Year() {
  const [months, setMonths] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchYearData = async () => {
      const calendarId = "primary";
      const startDate = new Date(currentYear, 0, 1).toISOString();
      const endDate = new Date(currentYear, 11, 31).toISOString();

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

        const monthsData = Array.from({ length: 12 }, (_, monthIndex) => {
          const days = generateDaysInMonth(monthIndex, currentYear);

          events?.forEach((event) => {
            const eventDate =
              event.start.date || event.start.dateTime.split("T")[0];
            const day = days.find((day) => day.date === eventDate);
            if (day) {
              day.events.push(event);
            }
          });

          return {
            name: new Date(currentYear, monthIndex).toLocaleString("default", {
              month: "long",
            }),
            days,
          };
        });

        setMonths(monthsData);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchYearData();
  }, [currentYear]);

  return (
    <>
      <div className="">
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
                      "py-1.5 hover:bg-gray-100 focus:z-10"
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
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

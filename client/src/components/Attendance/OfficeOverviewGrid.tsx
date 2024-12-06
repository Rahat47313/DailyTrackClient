import { useMemo } from "react";
import OfficeOverviewData from "./OfficeOverviewData.json";

// Types to improve type safety
type AttendanceStatus = "Present" | "Absent" | "-";
type UserAttendance = { [day: string]: AttendanceStatus };
type YearAttendance = { 
  [year: string]: { 
    [month: string]: { 
      [username: string]: UserAttendance 
    } 
  } 
};

type User = {
  id: string;
  username: string;
  name: string;
};

export default function OfficeOverviewGrid({
  navigationDate,
}: {
  navigationDate: Date;
}) {
  // Explicitly type the imported OfficeOverviewData
  const typedAttendanceData: YearAttendance = OfficeOverviewData as YearAttendance

  // Function to determine the number of days in a month (accounting for leap years)
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Type guard to check if a status is valid
  const isValidStatus = (status: string): status is AttendanceStatus => {
    return ["Present", "Absent", "-"].includes(status);
  };

  // Memoized attendance data for the current year and month
  const currentMonthAttendance = useMemo(() => {
    const year = navigationDate.getFullYear().toString();
    const month = navigationDate.getMonth().toString().padStart(2, '0');
    
    // Get the users and their attendance for this specific month
    const monthAttendance = typedAttendanceData[year]?.[month] || {};
    
    return monthAttendance;
  }, [navigationDate]);

  // Get the number of days in the current month
  const daysInMonth = useMemo(() => {
    return getDaysInMonth(
      navigationDate.getFullYear(), 
      navigationDate.getMonth()
    );
  }, [navigationDate]);

  // Hardcoded users (you might want to fetch this dynamically)
  const users: User[] = [
    { id: '1', username: 'johndoe', name: 'John Doe' },
    { id: '2', username: 'janedoe', name: 'Jane Doe' },
    { id: '3', username: 'bobsmith', name: 'Bob Smith' },
    // Add more users as needed
  ];

  // Function to get attendance status for a specific user and day
  const getAttendanceStatus = (username: string, day: number) => {
    const dayStr = day.toString().padStart(2, '0');
    const userMonthAttendance = currentMonthAttendance[username];
    const status = userMonthAttendance?.[dayStr];
    
    return isValidStatus(status) ? status : "-";
  };

  // Function to format status for display
  const formatStatus = (status: string) => {
    switch (status) {
      case "Present":
        return { full: "Present", abbr: "P" };
      case "Absent":
        return { full: "Absent", abbr: "A" };
      default:
        return { full: "-", abbr: "-" };
    }
  };

  return (
    <div className="flex h-full flex-col text-gray-900 dark:text-white">
      <div className="isolate flex flex-auto flex-col overflow-auto">
        <div className="flex max-w-full flex-none flex-col md:max-w-full">
          {/* Day Header */}
          <div className="sticky flex-none shadow ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5">
            <div 
              className="grid divide-x divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
              style={{
                gridTemplateColumns: `200px repeat(${daysInMonth}, 1fr)`,
              }}
            >
              {["Users", ...Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString())].map((day, index) => (
                <div
                  key={day}
                  className={`flex items-center ${index === 0? "justify-start pl-3" : "justify-center"} font-bold shadow py-3`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Grid */}
          <div className="flex flex-auto">
            <div className="sticky flex-none ring-1 ring-gray-200 dark:ring-gray-700" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines for each user */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200 dark:divide-gray-700"
                style={{
                  gridTemplateRows: `repeat(${users.length}, minmax(3rem, 1fr))`,
                }}
              >
                {users.map((user) => {
                  return (
                    <div
                      key={user.id}
                      className="grid"
                      style={{
                        gridTemplateColumns: `200px repeat(${daysInMonth}, 1fr)`,
                      }}
                    >
                      {/* User column */}
                      <div 
                        className="flex items-center justify-start sticky text-gray-500 dark:text-gray-400 pl-3 p-2"
                        title={`${user.name} (${user.username})`}
                      >
                        {user.username}
                      </div>

                      {/* Attendance for each day */}
                      {[...Array(daysInMonth)].map((_, dayIndex) => {
                        const day = dayIndex + 1;
                        const status = getAttendanceStatus(user.username, day);
                        const formattedStatus = formatStatus(status);

                        return (
                          <div
                            key={day}
                            className={`flex items-center justify-center sticky ${
                              status === "Present"
                                ? "text-green-500"
                                : status === "Absent"
                                ? "text-red-500"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          >
                            <span>{formattedStatus.abbr}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                <div />
              </div>

              {/* Vertical lines */}
              <div 
                className="col-start-1 col-end-2 row-start-1 grid divide-x divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700"
                style={{
                  gridTemplateColumns: `200px repeat(${daysInMonth}, 1fr)`,
                }}
              >
                {[...Array(daysInMonth + 1)].map((_, index) => (
                  <div
                    key={index}
                    className={`col-start-${index + 1} row-span-full`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
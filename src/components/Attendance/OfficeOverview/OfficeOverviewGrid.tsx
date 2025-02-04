import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/authSelectors";
import { selectAttendanceData } from "../../../redux/attendance/attendanceSelectors";
import { selectIsLoading } from "../../../redux/attendance/attendanceSelectors";

// Types to improve type safety
type AttendanceStatus = "Present" | "Absent" | "-";
type UserAttendance = { [day: string]: AttendanceStatus };
type YearAttendance = {
  [year: string]: {
    [month: string]: {
      [username: string]: UserAttendance;
    };
  };
};

interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
}

export default function OfficeOverviewGrid({
  navigationDate,
}: {
  navigationDate: Date;
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const attendanceData = useSelector(selectAttendanceData);
  const isLoading = useSelector(selectIsLoading);

  const usersAttendance = useMemo(() => {
    const year = navigationDate.getFullYear().toString();
    const month = (navigationDate.getMonth() + 1).toString().padStart(2, '0');
    const users = [];
  
    // Get all users' attendance for selected month
    Object.entries(attendanceData).forEach(([userId, userRecord]) => {
      // Filter based on permissions
      if (currentUser.userType === 'admin' && userRecord.userType === 'superAdmin') {
        return;
      }

      const monthData = userRecord.years?.[year]?.months?.[month]?.days || {};
      users.push({
        _id: userId,
        name: userRecord.name,
        attendance: monthData
      });
    });
  
    return users;
  }, [navigationDate, attendanceData, currentUser.userType]);

  // // Explicitly type the imported OfficeOverviewData
  // const typedAttendanceData: YearAttendance =
  // filteredAttendance as YearAttendance;

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
    const month = navigationDate.getMonth().toString().padStart(2, "0");

    // Get the users and their attendance for this specific month
    const monthAttendance = usersAttendance[year]?.[month] || {};

    return monthAttendance;
  }, [navigationDate]);

  // Get the number of days in the current month
  const daysInMonth = useMemo(() => {
    return getDaysInMonth(
      navigationDate.getFullYear(),
      navigationDate.getMonth()
    );
  }, [navigationDate]);

  // Function to get attendance status for a specific user and day
  const getAttendanceStatus = (username: string, day: number) => {
    const dayStr = day.toString().padStart(2, "0");
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
              {[
                "Users",
                ...Array.from({ length: daysInMonth }, (_, i) =>
                  (i + 1).toString()
                ),
              ].map((day, index) => (
                <div
                  key={day}
                  className={`flex items-center ${
                    index === 0 ? "justify-start pl-3" : "justify-center"
                  } font-bold shadow py-3`}
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
                  gridTemplateRows: `repeat(${usersAttendance.length}, minmax(3rem, 1fr))`,
                }}
              >
                {usersAttendance.map((user) => {
                  return (
                    <div
                      key={user._id}
                      className="grid"
                      style={{
                        gridTemplateColumns: `200px repeat(${daysInMonth}, 1fr)`,
                      }}
                    >
                      {/* User column */}
                      <div
                        className="flex items-center justify-start sticky text-gray-500 dark:text-gray-400 pl-3 p-2"
                        title={`${user.name} (${user.name})`}
                      >
                        {user.name}
                      </div>

                      {/* Attendance for each day */}
                      {[...Array(daysInMonth)].map((_, dayIndex) => {
                        const day = (dayIndex + 1).toString();
                        const status = attendanceData[navigationDate.getFullYear()]
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

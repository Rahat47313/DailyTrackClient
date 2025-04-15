import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/authSelectors";
import { selectAttendanceData } from "../../../redux/attendance/attendanceSelectors";
// import { selectUsers } from "../../../redux/users/usersSelectors"; // Import user selector
// import { User, AttendanceRecord, DayAttendance } from "../../../types"; // Import defined types

// // Types to improve type safety
// type AttendanceStatus = DayAttendance['status'];

export default function OfficeOverviewGrid({
  navigationDate,
}: {
  navigationDate: Date;
}) {
  const currentUser = useSelector(selectCurrentUser);
  const attendanceData = useSelector(selectAttendanceData);

  const usersAttendance = useMemo(() => {
    if(!currentUser) return [];
    const year = navigationDate.getFullYear().toString();
    // const month = (navigationDate.getMonth() + 1).toString().padStart(2, "0");
    const users: any[] = [];

    // Get all users' attendance for selected month
    Object.entries(attendanceData).forEach(([userId, userRecord]) => {
      // Filter based on permissions
      if (
        currentUser.userType === "admin" &&
        userRecord.user.userType === "superAdmin"
      ) {
        return;
      }

      const attendance = userRecord.years[year]?.months || {};

      users.push({
        _id: userId,
        name: userRecord.user.name,
        userType: userRecord.user.userType,
        attendance: {
          ...attendance // Keep existing months structure
        }
      });
    });

    return users;
  }, [navigationDate, attendanceData, currentUser?.userType]);

  // Function to determine the number of days in a month (accounting for leap years)
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // // Type guard to check if a status is valid
  // const isValidStatus = (status: string): status is AttendanceStatus => {
  //   return ["Present", "Absent", "-"].includes(status);
  // };

  // // Memoized attendance data for the current year and month
  // const currentMonthAttendance = useMemo(() => {
  //   const year = navigationDate.getFullYear().toString()
  //   const month = navigationDate.getMonth().toString().padStart(2, "0");

  //   // Get the users and their attendance for this specific month
  //   const monthAttendance = usersAttendance![year]?.[month] || {};
  //   console.log("Month Attendance:", monthAttendance);

  //   return monthAttendance;
  // }, [navigationDate]);

  // // Memoized attendance data for the current year and month
  // const currentMonthAttendance = useMemo(() => {
  //   if (!usersAttendance) return {};
    
  //   // Create a map of user attendance for easier lookup
  //   const attendanceMap = usersAttendance.reduce((acc, user) => {
  //     acc[user.name] = user.attendance;
  //     return acc;
  //   }, {} as Record<string, any>);

  //   console.log("Month Attendance:", attendanceMap);
  //   return attendanceMap;
  // }, [navigationDate, usersAttendance]);

  // Get the number of days in the current month
  const daysInMonth = useMemo(() => {
    return getDaysInMonth(
      navigationDate.getFullYear(),
      navigationDate.getMonth()
    );
  }, [navigationDate]);

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
              ].map((header, index) => (
                <div
                  key={header}
                  className={`flex items-center ${
                    index === 0 ? "justify-start pl-3" : "justify-center"
                  } font-bold shadow py-3`}
                >
                  {header}
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
                        title={`${user.name} (${user.userType})`}
                      >
                        {user.name}
                      </div>

                      {/* Attendance for each day */}
                      {[...Array(daysInMonth)].map((_, dayIndex) => {
                        // console.log(1)
                        const day = (dayIndex + 1).toString();
                        const month = navigationDate.toLocaleString("default", { month: "short" }).toUpperCase();
                        const status = user.attendance[month]?.days[day]?.status || '-';
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

import { useMemo } from "react";

// Types to improve type safety
type AttendanceStatus = 'Present' | 'Absent' | '-';
type MonthAttendance = { [day: number]: AttendanceStatus };
type YearAttendance = { [month: string]: MonthAttendance };

export default function PersonalAttendanceGrid({ 
  navigationDate, 
  attendanceData 
}: { 
  navigationDate: Date, 
  attendanceData: YearAttendance 
}) {
  // Generate an array of months in a fixed order
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  // Function to determine the number of days in a month (accounting for leap years)
  const getDaysInMonth = (year: number, month: string) => {
    const monthIndex = months.indexOf(month);
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  // Memoized attendance data for the current year
  const currentYearAttendance = useMemo(() => {
    const year = navigationDate.getFullYear();
    // Create a complete year's attendance structure
    const yearAttendance: YearAttendance = {};
    
    months.forEach(month => {
      yearAttendance[month] = {};
      const daysInMonth = getDaysInMonth(year, month);
      
      // Check if we have existing data for this month
      const existingMonthData = attendanceData[month] || {};
      
      // Populate attendance for each day
      for (let day = 1; day <= daysInMonth; day++) {
        yearAttendance[month][day] = existingMonthData[day] || '-';
      }
    });
    
    return yearAttendance;
  }, [navigationDate, attendanceData]);

  return (
    <div className="flex h-full flex-col text-gray-900 dark:text-white">
      <div className="isolate flex flex-auto flex-col overflow-auto">
        <div className="flex max-w-full flex-none flex-col md:max-w-full">
          {/* Month Header */}
          <div className="sticky flex-none shadow ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5">
            <div className="grid grid-cols-[repeat(13,1fr)] divide-x divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              {["date", ...months].map((month) => (
                <div
                  key={month}
                  className="flex items-center justify-center text-center font-bold shadow py-3"
                >
                  {month}
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Grid */}
          <div className="flex flex-auto">
            <div className="sticky flex-none ring-1 ring-gray-200 dark:ring-gray-700" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines for each day */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200 dark:divide-gray-700"
                style={{
                  gridTemplateRows: "repeat(31, minmax(3rem, 1fr))",
                }}
              >
                {[...Array(31)].map((_, rowIndex) => {
                  const day = rowIndex + 1;
                  return (
                    <div
                      key={rowIndex}
                      className="grid grid-cols-[repeat(13,1fr)]"
                    >
                      {/* Day number column */}
                      <div className="flex items-center justify-center sticky text-gray-500 dark:text-gray-400">
                        {day}
                      </div>

                      {/* Attendance for each month */}
                      {months.map((month) => {
                        // Only show status if the day exists in that month
                        const daysInMonth = getDaysInMonth(navigationDate.getFullYear(), month);
                        const status =
                          day <= daysInMonth
                            ? currentYearAttendance[month]?.[day] || "-"
                            : "-";

                        return (
                          <div
                            key={month}
                            className={`flex items-center justify-center sticky ${
                              status === "Present"
                                ? "text-green-500"
                                : status === "Absent"
                                ? "text-red-500"
                                : "text-gray-300"
                            }`}
                          >
                            {status}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 grid grid-cols-[repeat(13,1fr)] grid-rows-1 divide-x divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
                {[...Array(13)].map((_, index) => (
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
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/authSelectors";
import { selectAttendanceData } from "../../../redux/attendance/attendanceSelectors";

// Types to improve type safety
type AttendanceStatus = 'Present' | 'Absent' | '-';
type MonthAttendance = { [day: string]: AttendanceStatus | string };
// type YearAttendance = { [year: string]: { [month: string]: MonthAttendance } };
//type AttendanceData = { [year: string]: { [month: string]: { [day: string]: string} } };

export default function PersonalAttendanceGrid({ 
  navigationDate, 
}: { 
  navigationDate: Date, 
}) {
  const currentUser = useSelector(selectCurrentUser);
  const attendanceData = useSelector(selectAttendanceData);

  // Explicitly type the imported PersonalAttendanceData
  // const typedAttendanceData: YearAttendance = PersonalAttendanceData;

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

  // // Type guard to check if a status is valid
  // const isValidStatus = (status: string): status is AttendanceStatus => {
  //   return ['Present', 'Absent', '-'].includes(status);
  // };

  // Memoized attendance data filtered for current user
  const currentUserAttendance = useMemo(() => {
    const year = navigationDate.getFullYear().toString();
    const yearAttendance: { [month: string]: MonthAttendance } = {};
    
    months.forEach(month => {
      yearAttendance[month] = {};
      const daysInMonth = getDaysInMonth(navigationDate.getFullYear(), month);
      
      // Get only current user's attendance
      const userRecord = attendanceData[currentUser!._id];
      const monthData = userRecord?.years?.[year]?.months?.[month]?.days || {};
      
      // Populate attendance for each day
      for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = day.toString().padStart(2, '0');
        const dayData = monthData[day.toString()] || monthData[dayStr]; // just trying out both formats
      
        yearAttendance[month][dayStr] = dayData?.status || '-';
        // yearAttendance[month][dayStr] = isValidStatus(dayData?.status) ? dayData.status : '-';
        // const status = dayData?.status || '-';
        // yearAttendance[month][dayStr] = isValidStatus(status) ? status : '-';
      }
    });
    
    return yearAttendance;
  }, [navigationDate, attendanceData, currentUser?._id]);

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
                  const day = (rowIndex + 1).toString();
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
                        // Ensure day is padded to match how we stored it
                        const dayStr = day.toString().padStart(2, '0');
                        const status =
                        parseInt(day) <= daysInMonth
                            ? currentUserAttendance[month]?.[dayStr] || "-"
                            : "-";
                        
                        // Function to format status for display
                        const formatStatus = (status: string) => {
                          switch(status) {
                            case 'Present': return { full: 'Present', abbr: 'P' };
                            case 'Absent': return { full: 'Absent', abbr: 'A' };
                            default: return { full: '-', abbr: '-' };
                          }
                        };

                        const formattedStatus = formatStatus(status);
                        
                        return (
                          <div
                            key={month}
                            className={`flex items-center justify-center sticky ${
                              status === "Present"
                                ? "text-green-500"
                                : status === "Absent"
                                ? "text-red-500"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          >
                            <span className="hidden lg:inline">{formattedStatus.full}</span>
                            <span className="lg:hidden">{formattedStatus.abbr}</span>
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
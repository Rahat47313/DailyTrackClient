import { Tabs } from "flowbite-react";
import { useEffect, useRef, useMemo, useCallback } from "react";
import { BsPersonFill, BsPeopleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { selectCurrentUser } from "../redux/auth/authSelectors";
import { selectCurrentDateString } from "../redux/calendar/calendarSelectors";
import {
  selectClockingInTime,
  selectClockingOutTime,
  selectNavigationDateString,
  selectAttendanceData,
} from "../redux/attendance/attendanceSelectors";
import {
  clockIn,
  clockOut,
  fetchAttendanceData,
} from "../redux/attendance/attendanceThunks";
import PersonalAttendance from "../components/Attendance/PersonalAttendance/PersonalAttendance";
import OfficeOverview from "../components/Attendance/OfficeOverview/OfficeOverview";
import Time from "../components/Attendance/Time/Time";

export default function Attendance() {
  const dispatch = useDispatch<AppDispatch>();
  const tabsRef = useRef(null);
  const currentUser = useSelector(selectCurrentUser);
  const currentDateString = useSelector(selectCurrentDateString);
  const currentDate = useMemo(
    () => new Date(currentDateString),
    [currentDateString]
  );
  const clockingInTime = useSelector(selectClockingInTime);
  const clockingOutTime = useSelector(selectClockingOutTime);
  const attendanceData = useSelector(selectAttendanceData);
  const navigationDateString = useSelector(selectNavigationDateString);
  const navigationDate = useMemo(
    () => new Date(navigationDateString),
    [navigationDateString]
  );
  const tabTheme = useMemo(
    () => ({
      base: "flex flex-col gap-2",
      tablist: {
        base: "flex text-center",
        variant: {
          underline:
            "-mb-px flex-wrap justify-center border-b border-gray-200 dark:border-gray-700",
        },
        tabitem: {
          base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:dark:ring-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
          variant: {
            underline: {
              base: "rounded-t-lg",
              active: {
                on: "active rounded-t-lg border-b-2 border-red-600 text-red-600 dark:border-red-500 dark:text-red-500",
                off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
              },
            },
          },
          icon: "mr-2 h-5 w-5",
        },
      },
      tabitemcontainer: {
        base: "",
        variant: {
          underline: "",
        },
      },
      tabpanel: "py-3",
    }),
    []
  );

  const handleClockIn = useCallback(async () => {
    try {
      await dispatch(clockIn()).unwrap();
    } catch (error) {
      console.error("Failed to clock in:", error);
    }
  }, [dispatch]);

  const handleClockOut = useCallback(async () => {
    try {
      await dispatch(clockOut()).unwrap();
    } catch (error) {
      console.error("Failed to clock out:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    const year = navigationDate.getFullYear().toString();
    const shouldFetch = !attendanceData || !attendanceData[year];

    if (shouldFetch) {
      dispatch(fetchAttendanceData(year));
    }
  }, [navigationDate]);

  return (
    <>
      <div className="p-4 md:ml-64 mt-[60px]">
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Attendance
        </div>
        <div className="flex items-center">
          <div>
            <p>
              {currentDate.toLocaleDateString("default", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {currentDate.toLocaleString("default", { weekday: "long" })}
            </p>
            <Time />
          </div>
          <p className="flex text-4xl mx-auto">Welcome, {currentUser?.name}</p>
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center gap-10 mb-3">
              <button
                onClick={handleClockIn}
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Clock In
              </button>
              <button
                onClick={handleClockOut}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Clock Out
              </button>
            </div>
            {clockingInTime && <p>Clocked in at {clockingInTime}</p>}
            {clockingOutTime && <p>Clocked out at {clockingOutTime}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Tabs variant="underline" ref={tabsRef} theme={tabTheme}>
            <Tabs.Item active title="Personal Attendance" icon={BsPersonFill}>
              <PersonalAttendance />
            </Tabs.Item>
            <Tabs.Item title="Office Overview" icon={BsPeopleFill}>
              <OfficeOverview />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </>
  );
}

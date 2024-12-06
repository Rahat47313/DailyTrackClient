import { Button, Tabs } from "flowbite-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { BsPersonFill, BsPeopleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectCurrentDate } from "../../redux/calendar/calendarSelectors";
import PersonalAttendanceGrid from "./PersonalAttendanceGrid";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Attendance() {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const currentDate = useSelector(selectCurrentDate);
  const [navigationDate, setNavigationDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({
    JAN: {
      1: "Present",
      2: "Absent",
      3: "Present",
      4: "Present",
      5: "Present",
      15: "Absent",
      22: "Absent",
      23: "Absent",
      24: "Absent",
      25: "Absent",
      26: "Absent",
      27: "Absent",
      28: "Absent",
      29: "Absent",
      30: "Absent",
      31: "Absent",
    },
    FEB: {
      1: "Present",
      2: "Present",
      3: "Absent",
      4: "Present",
      5: "Present",
      15: "Absent",
      22: "Absent",
      23: "Present",
      24: "Absent",
      25: "Absent",
      26: "Present",
      27: "Absent",
      28: "Absent",
      29: "Absent",
      30: "Absent",
    },
    MAR: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
    APR: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
    },
    MAY: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
    JUN: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
    JUL: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
    AUG: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
    SEP: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
    OCT: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
    NOV: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
    DEC: {
      1: "Present",
      2: "Present",
      3: "Present",
      4: "Absent",
      5: "Present",
      15: "Present",
      22: "Present",
      23: "Present",
      24: "Absent",
      25: "Present",
      26: "Present",
      27: "Present",
      28: "Absent",
      29: "Present",
      30: "Present",
      31: "Present",
    },
  });
  const tabTheme = {
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
  };

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  const navigateDate = useCallback(
    (amount) => {
      const newDate = new Date(navigationDate);
      newDate.setFullYear(navigationDate.getFullYear() + amount);
      setNavigationDate(newDate);
    },
    [navigationDate]
  );

  const handleNext = useCallback(() => {
    navigateDate(1, "year");
  }, [navigateDate]);

  const handlePrevious = useCallback(() => {
    navigateDate(-1, "year");
  }, [navigateDate]);

  const handleToday = useCallback(() => {
    setNavigationDate(new Date());
  }, []);

  return (
    <div>
      <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
        Attendance
      </div>
      <div className="mb-4">
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
        <p>{currentTime}</p>
      </div>
      <p className="text-4xl">Welcome, User</p>
      <div className="flex flex-col gap-3">
        <Tabs
          variant="underline"
          ref={tabsRef}
          theme={tabTheme}
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item active title="Personal Attendance" icon={BsPersonFill}>
            <div className="my-10">
              <div className="flex justify-center items-center gap-20">
                <button className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                  Clock In
                </button>
                <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                  Clock Out
                </button>
              </div>
            </div>
            <header className="flex flex-none flex-col-reverse md:flex-row items-center justify-between rounded-t-md bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-500 px-6 py-4">
              <div className="flex flex-col items-center justify-center mx-auto">
                <p>Calendar showing:</p>
                <p>{navigationDate.getFullYear()}</p>
              </div>
              {/* Navigation Controls */}
              <div className="flex items-center gap-4">
                <div className="relative flex items-center rounded-md ring-1 ring-gray-300 dark:ring-gray-600 shadow-sm md:items-stretch">
                  <button
                    onClick={handlePrevious}
                    className="flex items-center justify-center rounded-l-md py-2.5 pl-3 pr-4 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative md:w-9 md:px-2"
                  >
                    <span className="sr-only">Previous year</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={handleToday}
                    className="px-3.5 py-2.5 text-sm font-semibold bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative"
                  >
                    Today
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex items-center justify-center rounded-r-md py-2.5 pl-4 pr-3 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative md:w-9 md:px-2"
                  >
                    <span className="sr-only">Next year</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </header>
            <PersonalAttendanceGrid navigationDate={navigationDate} attendanceData={attendanceData} />
          </Tabs.Item>
          <Tabs.Item title="Office Overview" icon={BsPeopleFill}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Dashboard tab&apos;s associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
        </Tabs>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Active tab: {activeTab}
        </div>
        <Button.Group>
          <Button color="gray" onClick={() => tabsRef.current?.setActiveTab(0)}>
            Profile
          </Button>
          <Button color="gray" onClick={() => tabsRef.current?.setActiveTab(1)}>
            Dashboard
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}

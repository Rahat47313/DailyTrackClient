import { Button, Tabs } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { BsPersonFill, BsPeopleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectCurrentDate } from "../../redux/calendar/calendarSelectors";
import PersonalAttendance from "./PersonalAttendance";
import OfficeOverview from "./OfficeOverview";

export default function Attendance() {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const currentDate = useSelector(selectCurrentDate);
  const [clockingInTime, setClockingInTime] = useState("");
  const [clockingOutTime, setClockingOutTime] = useState("");
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

  return (
    <div>
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
          <p>{currentTime}</p>
        </div>
        <p className="flex text-4xl mx-auto">Welcome, User</p>
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center gap-10 mb-3">
            <button
              onClick={() => setClockingInTime(new Date().toLocaleTimeString())}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Clock In
            </button>
            <button
              onClick={() =>
                setClockingOutTime(new Date().toLocaleTimeString())
              }
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
        <Tabs
          variant="underline"
          ref={tabsRef}
          theme={tabTheme}
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item active title="Personal Attendance" icon={BsPersonFill}>
            <PersonalAttendance />
          </Tabs.Item>
          <Tabs.Item title="Office Overview" icon={BsPeopleFill}>
            <OfficeOverview />
          </Tabs.Item>
        </Tabs>
        {/* <div className="text-sm text-gray-500 dark:text-gray-400">
          Active tab: {activeTab}
        </div>
        <Button.Group>
          <Button color="gray" onClick={() => tabsRef.current?.setActiveTab(0)}>
            Profile
          </Button>
          <Button color="gray" onClick={() => tabsRef.current?.setActiveTab(1)}>
            Dashboard
          </Button>
        </Button.Group> */}
      </div>
    </div>
  );
}

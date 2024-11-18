import { Button, Tabs } from "flowbite-react";
import { useRef, useState } from "react";
import { BsPersonFill, BsPeopleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectCurrentDate } from "../../redux/calendar/calendarSelectors";

export default function Attendance() {
  const tabsRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const currentDate = useSelector(selectCurrentDate);
  const tabTheme = {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      variant: {
        underline:
          "-mb-px flex-wrap justify-center border-b border-gray-200 dark:border-gray-700",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
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
  return (
    <div>
      <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
        Attendance
      </div>
      <div>
                <p>
                  Today: {""}
                  {currentDate.toLocaleDateString("default", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {currentDate.toLocaleString("default", { weekday: "long" })}
                </p>
              </div>
      <div className="flex flex-col gap-3">
        <Tabs
          variant="underline"
          ref={tabsRef}
          theme={tabTheme}
          onActiveTabChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.Item active title="Personal Attendance" icon={BsPersonFill}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
          <Tabs.Item title="Office Overview" icon={BsPeopleFill}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
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

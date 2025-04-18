import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gapi } from "gapi-script";
import { Datepicker } from "flowbite-react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";
import Day from "../components/Calendar/Day";
import Week from "../components/Calendar/Week";
import Month from "../components/Calendar/Month";
import Year from "../components/Calendar/Year";
import {
  setCalendarView,
  setNavigationDate,
} from "../redux/calendar/calendarSlice";
import {
  initializeGoogleAPI,
  fetchEvents,
  fetchAllTasks,
} from "../redux/calendar/calendarThunks";
import {
  selectCalendarView,
  selectCurrentDateString,
  selectNavigationDate,
  selectIsLoading,
  selectIsAuthenticated,
} from "../redux/calendar/calendarSelectors";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";

const VIEW_OPTIONS = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

// const isCurrentDate = (date) => {
//   const today = new Date();
//   return (
//     today.getFullYear() === date.getFullYear() &&
//     today.getMonth() === date.getMonth() &&
//     today.getDate() === date.getDate()
//   );
// };

// const isCurrentMonth = (date) => {
//   const currentDate = new Date();
//   return (
//     currentDate.getFullYear() === date.getFullYear() &&
//     currentDate.getMonth() === date.getMonth()
//   );
// };

// const isCurrentYear = (date) => {
//   const currentDate = new Date();
//   return currentDate.getFullYear() === date.getFullYear();
// };

export default function Calendar() {
  const dispatch = useDispatch<AppDispatch>();
  const calendarView = useSelector(selectCalendarView);
  const currentDateString = useSelector(selectCurrentDateString);
  const currentDate = useMemo(
    () => new Date(currentDateString),
    [currentDateString]
  );
  const navigationDate = useSelector(selectNavigationDate);
  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const isTasksRefreshing = useSelector(
    (state: RootState) => state.tasks.isRefreshing
  );

  const classNames = useCallback((...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  }, []);

  useEffect(() => {
    dispatch(fetchAllTasks());

    // Refresh tasks periodically
    const intervalId = setInterval(() => {
      dispatch(fetchAllTasks());
    }, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        if (!gapi.client) {
          await dispatch(initializeGoogleAPI()).unwrap();
        }

        // const auth2 = gapi.auth2?.getAuthInstance();
        // if (!auth2) {
        //   navigate("/login");
        //   return;
        // }

        // if (!isAuthenticated) {
        //   navigate("/login");
        //   return;
        // }

        if (isMounted) {
          await dispatch(fetchEvents()).unwrap();
        }
      } catch (error) {
        console.error("Calendar auth error:", error);
        // if (isMounted) {
        //   navigate("/login");
        // }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthenticated, navigate]);

  interface NavigateDateParams {
    amount: number;
    view: (typeof VIEW_OPTIONS)[keyof typeof VIEW_OPTIONS];
  }

  const navigateDate = useCallback(
    ({ amount, view }: NavigateDateParams): void => {
      const newDate: Date = new Date(navigationDate);
      switch (view) {
        case VIEW_OPTIONS.DAY:
          newDate.setDate(navigationDate.getDate() + amount);
          break;
        case VIEW_OPTIONS.WEEK:
          newDate.setDate(navigationDate.getDate() + amount * 7);
          break;
        case VIEW_OPTIONS.MONTH:
          newDate.setMonth(navigationDate.getMonth() + amount);
          break;
        case VIEW_OPTIONS.YEAR:
          newDate.setFullYear(navigationDate.getFullYear() + amount);
          break;
      }
      dispatch(setNavigationDate(newDate.toISOString()));
    },
    [dispatch, navigationDate]
  );

  const handleNext = useCallback(() => {
    navigateDate({ amount: 1, view: calendarView });
  }, [navigateDate, calendarView]);

  const handlePrevious = useCallback(() => {
    navigateDate({ amount: -1, view: calendarView });
  }, [navigateDate, calendarView]);

  const handleToday = useCallback(() => {
    dispatch(setNavigationDate(new Date().toISOString()));
  }, [dispatch]);

  const getNavigationLabels = useCallback(() => {
    switch (calendarView) {
      case VIEW_OPTIONS.DAY:
        return {
          previous: "Previous day",
          current: "Today",
          next: "Next day",
        };
      case VIEW_OPTIONS.WEEK:
        return {
          previous: "Previous week",
          current: "Today",
          next: "Next week",
        };
      case VIEW_OPTIONS.MONTH:
        return {
          previous: "Previous month",
          current: "Today",
          next: "Next month",
        };
      case VIEW_OPTIONS.YEAR:
        return {
          previous: "Previous year",
          current: "Today",
          next: "Next year",
        };
      default:
        return {
          previous: "Previous",
          current: "Current",
          next: "Next",
        };
    }
  }, [calendarView]);

  const renderCalendarView = () => {
    switch (calendarView) {
      case VIEW_OPTIONS.DAY:
        return <Day />;
      case VIEW_OPTIONS.WEEK:
        return <Week />;
      case VIEW_OPTIONS.MONTH:
        return <Month />;
      case VIEW_OPTIONS.YEAR:
        return <Year />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-4 md:ml-64 mt-[60px]">
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Calendar
        </div>

        {/* Calendar Header */}
        <header className="flex flex-none flex-col-reverse md:flex-row items-center justify-between rounded-t-md bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-500 px-6 py-4">
          <div className="w-full">
            <div className="flex items-center justify-center text-base font-semibold leading-6 w-full">
              <time
                dateTime={navigationDate.toISOString()}
                className="mt-3 sm:hidden"
              >
                {navigationDate.toLocaleDateString()}
              </time>
              <time
                dateTime={navigationDate.toISOString()}
                className="hidden sm:flex w-full"
              >
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
                <div className="flex flex-col items-center justify-center mx-auto">
                  <p>Calendar showing:</p>
                  <p>
                    {calendarView === "year" &&
                      navigationDate.toLocaleDateString("default", {
                        year: "numeric",
                      })}
                    {calendarView === "month" &&
                      navigationDate.toLocaleDateString("default", {
                        year: "numeric",
                        month: "long",
                      })}
                    {calendarView === "week" &&
                      navigationDate.toLocaleDateString("default", {
                        year: "numeric",
                        month: "long",
                      })}
                    {calendarView === "day" &&
                      navigationDate.toLocaleDateString("default", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                </div>
              </time>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            {(calendarView === "day" || calendarView === "week") && (
              <div>
                <Datepicker
                  id="datepick"
                  className="[&_input]:bg-white dark:[&_input]:bg-gray-800 hover:[&_input]:bg-gray-50 hover:dark:[&_input]:bg-gray-700"
                />
              </div>
            )}

            <div className="relative flex items-center rounded-md ring-1 ring-gray-300 dark:ring-gray-600 shadow-sm md:items-stretch">
              <button
                onClick={handlePrevious}
                className="flex items-center justify-center rounded-l-md py-2.5 pl-3 pr-4 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative md:w-9 md:px-2"
                disabled={isLoading}
              >
                <span className="sr-only">
                  {getNavigationLabels().previous}
                </span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={handleToday}
                className="px-3.5 py-2.5 text-sm font-semibold bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative"
                disabled={isLoading}
              >
                {getNavigationLabels().current}
              </button>
              <button
                onClick={handleNext}
                className="flex items-center justify-center rounded-r-md py-2.5 pl-4 pr-3 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative md:w-9 md:px-2"
                disabled={isLoading}
              >
                <span className="sr-only">{getNavigationLabels().next}</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* View Selector */}
            <Menu as="div" className="relative">
              <Menu.Button className="text-sm w-max font-semibold shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 rounded-lg px-3 py-2.5 ">
                {calendarView.charAt(0).toUpperCase() + calendarView.slice(1)}{" "}
                view
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400 inline-block" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-36 overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 focus:outline-none">
                {Object.values(VIEW_OPTIONS).map((view) => (
                  <Menu.Item key={view}>
                    {({ active }) => (
                      <button
                        onClick={() => dispatch(setCalendarView(view))}
                        className={classNames(
                          active ? "bg-gray-100 dark:bg-gray-700" : "",
                          "block px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200"
                        )}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)} view
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </header>

        {/* Calendar Content */}
        <div className="flex-1 overflow-auto">
          {isLoading && !isTasksRefreshing ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : (
            <>
              {renderCalendarView()}
              {isTasksRefreshing && (
                <div className="fixed bottom-4 right-4">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

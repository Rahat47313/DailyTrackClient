import { useCallback, useMemo, memo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import OfficeOverviewGrid from "./OfficeOverviewGrid";
import { useDispatch, useSelector } from "react-redux";
import { selectNavigationDateString } from "../../../redux/attendance/attendanceSelectors";
import { setNavigationDate } from "../../../redux/attendance/attendanceSlice";

function OfficeOverviewComponent() {
  const dispatch = useDispatch();
  const navigationDateString = useSelector(selectNavigationDateString);
  const navigationDate = useMemo(
    () => new Date(navigationDateString),
    [navigationDateString]
  );

  const navigateDate = useCallback(
    (amount: number) => {
      const newDate = new Date(navigationDate);
      newDate.setMonth(navigationDate.getMonth() + amount);
      dispatch(setNavigationDate(newDate.toISOString()));
    },
    [navigationDate]
  );

  const handleNext = useCallback(() => {
    navigateDate(1);
  }, [navigateDate]);

  const handlePrevious = useCallback(() => {
    navigateDate(-1);
  }, [navigateDate]);

  const handleToday = useCallback(() => {
    dispatch(setNavigationDate(new Date().toISOString()));
  }, [dispatch]);

  return (
    <>
      <header className="flex flex-none flex-col-reverse md:flex-row items-center justify-between rounded-t-md bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-500 px-6 py-4">
        <div className="flex items-center justify-center mx-auto">
          {navigationDate.toLocaleDateString("default", {
            year: "numeric",
            month: "long",
          })}
        </div>
        {/* Navigation Controls */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center rounded-md ring-1 ring-gray-300 dark:ring-gray-600 shadow-sm md:items-stretch">
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center rounded-l-md py-2.5 pl-3 pr-4 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative md:w-9 md:px-2"
            >
              <span className="sr-only">Previous month</span>
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
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <OfficeOverviewGrid navigationDate={navigationDate} />
    </>
  );
}

const OfficeOverview = memo(OfficeOverviewComponent);
export default OfficeOverview;

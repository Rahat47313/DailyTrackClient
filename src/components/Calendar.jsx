import { Fragment, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import Day from "./Day";
import Week from "./Week";
import Month from "./Month";
import Year from "./Year"

export default function Calendar() {
  const [calendarView, setCalenderView] = useState("year")

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
        Calendar
      </div>
      <div className="flex h-full flex-col text-gray-900 dark:text-white">
        <header className="flex flex-none items-center justify-between rounded-t-md bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-500 px-6 py-4">
          <div>
            <h1 className="text-base font-semibold leading-6">
              <time dateTime="2022-01-22" className="sm:hidden">
                Jan 22, 2022
              </time>
              <time dateTime="2022-01-22" className="hidden sm:inline">
                January 22, 2022
              </time>
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Saturday
            </p>
          </div>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <div
                className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300 dark:ring-gray-600"
                aria-hidden="true"
              />
              <button
                type="button"
                className="flex items-center justify-center rounded-l-md py-2.5 pl-3 pr-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:relative md:w-9 md:px-2 bg-white dark:bg-gray-800 md:hover:bg-gray-50 md:hover:dark:bg-gray-700"
              >
                <span className="sr-only">Previous day</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus:relative md:block"
              >
                Today
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex items-center justify-center rounded-r-md py-2.5 pl-4 pr-3 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:relative md:w-9 md:px-2 bg-white dark:bg-gray-800 md:hover:bg-gray-50 md:hover:dark:bg-gray-700"
              >
                <span className="sr-only">Next day</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center">
              <Menu as="div" className="relative">
                <Menu.Button
                  type="button"
                  className="bg-white hover:bg-gray-50 border border-gray-300 font-semibold rounded-lg text-sm p-2.5 text-center flex justify-center items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                >
                  Day view
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={()=> setCalenderView("day")}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-700 dark:text-gray-200",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Day view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={()=> setCalenderView("week")}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-700 dark:text-gray-200",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Week view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={()=> setCalenderView("month")}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-700 dark:text-gray-200",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Month view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={()=> setCalenderView("year")}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-700 dark:text-gray-200",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Year view
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div className="ml-6 h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <button
                type="button"
                className="ml-6 rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add event
              </button>
            </div>
            <Menu as="div" className="relative ml-6 md:hidden">
              <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                              : "text-gray-700 dark:text-gray-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Create event
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                              : "text-gray-700 dark:text-gray-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Go to today
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={()=> setCalenderView("day")}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                              : "text-gray-700 dark:text-gray-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={()=> setCalenderView("week")}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                              : "text-gray-700 dark:text-gray-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={()=> setCalenderView("month")}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                              : "text-gray-700 dark:text-gray-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={()=> setCalenderView("year")}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                              : "text-gray-700 dark:text-gray-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
        {calendarView==="day" && <Day />}
        {calendarView==="week" && <Week />}
        {calendarView==="month" && <Month />}
        {calendarView==="year" && <Year />}
        
        
      </div>
    </>
  );
}

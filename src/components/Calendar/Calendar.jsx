import { useEffect, useState, useCallback } from "react";
import { gapi } from "gapi-script";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";
import Day from "./Day";
import Week from "./Week";
import Month from "./Month";
import Year from "./Year";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = "primary";
const SCOPES = "https://www.googleapis.com/auth/calendar";

const VIEW_OPTIONS = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

export default function Calendar() {
  const [calendarView, setCalendarView] = useState(VIEW_OPTIONS.YEAR);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const classNames = useCallback((...classes) => {
    return classes.filter(Boolean).join(" ");
  }, []);

  const navigateDate = useCallback((days) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + days);
      return newDate;
    });
  }, []);

  const handleNextDay = useCallback(() => navigateDate(1), [navigateDate]);
  const handlePreviousDay = useCallback(() => navigateDate(-1), [navigateDate]);
  const handleToday = useCallback(() => setCurrentDate(new Date()), []);

  const initializeGoogleAPI = useCallback(async () => {
    try {
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: SCOPES,
      });
      
      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      setIsAuthenticated(isSignedIn);
      
      if (isSignedIn) {
        await fetchEvents();
      }
    } catch (error) {
      setError("Failed to initialize Google Calendar API");
      console.error("Initialization error:", error);
    }
  }, []);

  useEffect(() => {
    gapi.load("client:auth2", initializeGoogleAPI);
  }, [initializeGoogleAPI]);

  const handleAuthChange = useCallback(async (isSignedIn) => {
    setIsAuthenticated(isSignedIn);
    if (isSignedIn) {
      await fetchEvents();
    } else {
      setEvents([]);
    }
  }, []);

  const handleSignIn = useCallback(async () => {
    try {
      await gapi.auth2.getAuthInstance().signIn();
      handleAuthChange(true);
    } catch (error) {
      setError("Sign in failed");
      console.error("Sign in error:", error);
    }
  }, [handleAuthChange]);

  const handleSignOut = useCallback(async () => {
    try {
      await gapi.auth2.getAuthInstance().signOut();
      handleAuthChange(false);
    } catch (error) {
      setError("Sign out failed");
      console.error("Sign out error:", error);
    }
  }, [handleAuthChange]);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      });
      
      setEvents(response.result.items);
    } catch (error) {
      setError("Failed to fetch events");
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (eventDetails) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: CALENDAR_ID,
        resource: eventDetails,
      });
      await fetchEvents();
      return response;
    } catch (error) {
      setError("Failed to create event");
      console.error("Error creating event:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchEvents]);

  const updateEvent = useCallback(async (eventId, updatedEventDetails) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await gapi.client.calendar.events.update({
        calendarId: CALENDAR_ID,
        eventId,
        resource: updatedEventDetails,
      });
      await fetchEvents();
      return response;
    } catch (error) {
      setError("Failed to update event");
      console.error("Error updating event:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchEvents]);

  const deleteEvent = useCallback(async (eventId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await gapi.client.calendar.events.delete({
        calendarId: CALENDAR_ID,
        eventId,
      });
      await fetchEvents();
    } catch (error) {
      setError("Failed to delete event");
      console.error("Error deleting event:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchEvents]);

  const renderCalendarView = () => {
    const viewProps = {
      currentDate,
      events,
      isLoading,
      onCreateEvent: createEvent,
      onUpdateEvent: updateEvent,
      onDeleteEvent: deleteEvent,
    };

    switch (calendarView) {
      case VIEW_OPTIONS.DAY:
        return <Day {...viewProps} />;
      case VIEW_OPTIONS.WEEK:
        return <Week {...viewProps} />;
      case VIEW_OPTIONS.MONTH:
        return <Month {...viewProps} />;
      case VIEW_OPTIONS.YEAR:
        return <Year {...viewProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
        Calendar
      </div>
      
      {/* Authentication and Action Buttons */}
      <div className="flex gap-4 mb-4">
        {!isAuthenticated ? (
          <button
            onClick={handleSignIn}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading}
          >
            Sign In
          </button>
        ) : (
          <button
            onClick={handleSignOut}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading}
          >
            Sign Out
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* Calendar Header */}
      <header className="flex flex-none items-center justify-between rounded-t-md bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-500 px-6 py-4">
        <div>
          <h1 className="text-base font-semibold leading-6">
            <time dateTime={currentDate.toISOString()} className="sm:hidden">
              {currentDate.toLocaleDateString()}
            </time>
            <time
              dateTime={currentDate.toISOString()}
              className="hidden sm:inline"
            >
              {currentDate.toLocaleDateString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {currentDate.toLocaleString("default", { weekday: "long" })}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md ring-1 ring-gray-300 dark:ring-gray-600 shadow-sm md:items-stretch">
            <button
              onClick={handlePreviousDay}
              className="flex items-center justify-center rounded-l-md py-2.5 pl-3 pr-4 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative md:w-9 md:px-2"
              disabled={isLoading}
            >
              <span className="sr-only">Previous day</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={handleToday}
              className="hidden px-3.5 py-2.5 text-sm font-semibold bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative md:block"
              disabled={isLoading}
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              onClick={handleNextDay}
              className="flex items-center justify-center rounded-r-md py-2.5 pl-4 pr-3 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 focus:relative md:w-9 md:px-2"
              disabled={isLoading}
            >
              <span className="sr-only">Next day</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* View Selector */}
          <Menu as="div" className="relative ml-4">
            <Menu.Button className="text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 hover:dark:bg-gray-700 rounded-lg px-3 py-2.5 ">
              {calendarView.charAt(0).toUpperCase() + calendarView.slice(1)} view
              <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400 inline-block" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-36 overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 focus:outline-none">
              {Object.values(VIEW_OPTIONS).map((view) => (
                <Menu.Item key={view}>
                  {({ active }) => (
                    <button
                      onClick={() => setCalendarView(view)}
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
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : (
          renderCalendarView()
        )}
      </div>
    </div>
  );
}
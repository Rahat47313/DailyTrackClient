import { gapi } from "gapi-script";
import {
  setEvents,
  setIsLoading,
  setError,
  setIsAuthenticated,
} from "./calendarSlice";

const CALENDAR_ID = "primary";
// const currentYear = new Date().getFullYear();
const startDate = new Date(Date.UTC(1000, 10, 15));
const endDate = new Date(Date.UTC(9999, 11, 31));

export const initializeGoogleAPI = () => async (dispatch) => {
  try {
    await gapi.client.init({
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      ],
      scope: "https://www.googleapis.com/auth/calendar",
    });

    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    dispatch(setIsAuthenticated(isSignedIn));

    if (isSignedIn) {
      dispatch(fetchEvents(startDate, endDate));
    }
  } catch (error) {
    dispatch(setError("Failed to initialize Google Calendar API"));
    console.error("Initialization error:", error);
  }
};

export const fetchEvents = (startDate, endDate) => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setError(null));

  try {
    const response = await gapi.client.calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      timeZone: "UTC",
      showDeleted: false,
      singleEvents: true,
      maxResults: 9999,
      orderBy: "startTime",
    });

    dispatch(setEvents(response.result.items));
  } catch (error) {
    dispatch(setError("Failed to fetch events"));
    console.error("Error fetching events:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const createEvent = (eventDetails) => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setError(null));

  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: eventDetails,
    });

    await dispatch(
      fetchEvents(startDate, endDate)
    );
    return response;
  } catch (error) {
    dispatch(setError("Failed to create event"));
    console.error("Error creating event:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const updateEvent =
  (eventId, updatedEventDetails) => async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    try {
      const response = await gapi.client.calendar.events.update({
        calendarId: CALENDAR_ID,
        eventId,
        resource: updatedEventDetails,
      });

      await dispatch(
        fetchEvents(startDate, endDate)
      );
      return response;
    } catch (error) {
      dispatch(setError("Failed to update event"));
      console.error("Error updating event:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setError(null));

  try {
    await gapi.client.calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId,
    });

    await dispatch(
      fetchEvents(startDate, endDate)
    );
  } catch (error) {
    dispatch(setError("Failed to delete event"));
    console.error("Error deleting event:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

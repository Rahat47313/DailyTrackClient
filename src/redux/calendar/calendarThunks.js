import { gapi } from "gapi-script";
import {
  setEvents,
  setIsLoading,
  setError,
  setIsAuthenticated,
} from "./calendarSlice";

const CALENDAR_ID = "primary";

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
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, 0, 1);
      const endDate = new Date(currentYear, 11, 31);
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
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
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

    const currentYear = new Date().getFullYear();
    await dispatch(
      fetchEvents(new Date(currentYear, 0, 1), new Date(currentYear, 11, 31))
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

      const currentYear = new Date().getFullYear();
      await dispatch(
        fetchEvents(new Date(currentYear, 0, 1), new Date(currentYear, 11, 31))
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

    const currentYear = new Date().getFullYear();
    await dispatch(
      fetchEvents(new Date(currentYear, 0, 1), new Date(currentYear, 11, 31))
    );
  } catch (error) {
    dispatch(setError("Failed to delete event"));
    console.error("Error deleting event:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

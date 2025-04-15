import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { gapi } from "gapi-script";
import {
  setEvents,
  setIsLoading,
  setError,
  setIsAuthenticated,
} from "./calendarSlice";
import axiosInstance from "../../utils/axiosConfig";
import { setTasks } from "../tasks/tasksSlice";

const CALENDAR_ID = "primary";
// const currentYear = new Date().getFullYear();
const startDate = new Date(Date.UTC(1000, 10, 15));
const endDate = new Date(Date.UTC(9999, 11, 31));

export const initializeGoogleAPI = createAsyncThunk(
  "calendar/initialize",
  async (_, { dispatch }) => {
    // Wait for gapi to load completely
    if (!gapi.client) {
      return new Promise((resolve) => {
        gapi.load('client:auth2', async () => {
          try {
            await gapi.client.init({
              apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
              clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
              discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
              ],
              scope: "https://www.googleapis.com/auth/calendar",
            });

            const auth2 = gapi.auth2.getAuthInstance();
            const isSignedIn = auth2.isSignedIn.get();
            
            auth2.isSignedIn.listen((signedIn: boolean) => {
              dispatch(setIsAuthenticated(signedIn));
            });

            dispatch(setIsAuthenticated(isSignedIn));
            resolve(isSignedIn);
          } catch (error) {
            let errorMessage = "Error in initializeGoogleAPI of calendarThunks";
            if(error instanceof Error) {
              errorMessage = error.message;
            }
            dispatch(setError(errorMessage));
            throw error;
          }
        });
      });
    }

    // If gapi is already initialized
    const auth2 = gapi.auth2?.getAuthInstance();
    if (auth2) {
      const isSignedIn = auth2.isSignedIn.get();
      dispatch(setIsAuthenticated(isSignedIn));
      return isSignedIn;
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "calendar/fetchEvents",
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));

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
      return response.result.items;
    } catch (error) {
      let errorMessage = "Error in fetchEvents of calendarThunks";
      if(error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      console.error("Error fetching events:", error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export const createEvent = (eventDetails: any) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setError(null));

  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: eventDetails,
    });

    await dispatch(fetchEvents());
    return response;
  } catch (error) {
    dispatch(setError("Failed to create event"));
    console.error("Error creating event:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const updateEvent =
  (eventId: any, updatedEventDetails: any) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    try {
      const response = await gapi.client.calendar.events.update({
        calendarId: CALENDAR_ID,
        eventId,
        resource: updatedEventDetails,
      });

      await dispatch(fetchEvents());
      return response;
    } catch (error) {
      dispatch(setError("Failed to update event"));
      console.error("Error updating event:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const deleteEvent = (eventId: any) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setError(null));

  try {
    await gapi.client.calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId,
    });

    await dispatch(fetchEvents());
  } catch (error) {
    dispatch(setError("Failed to delete event"));
    console.error("Error deleting event:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAllTasks',
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axiosInstance.get('/tasks');
      dispatch(setTasks(data));
      return data;
    } catch (error) {
      let errorMessage = "Error in fetchAllTasks of calendarThunks";
      if(error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);
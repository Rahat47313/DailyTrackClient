import { gapi } from 'gapi-script';
import {
  setEvents,
  setIsLoading,
  setError,
  setIsAuthenticated,
  setMonths,
} from './calendarSlice';

const CALENDAR_ID = 'primary';

export const initializeGoogleAPI = () => async (dispatch) => {
  try {
    await gapi.client.init({
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
      ],
      scope: 'https://www.googleapis.com/auth/calendar',
    });
    
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    dispatch(setIsAuthenticated(isSignedIn));
    
    if (isSignedIn) {
      dispatch(fetchEvents());
    }
  } catch (error) {
    dispatch(setError('Failed to initialize Google Calendar API'));
    console.error('Initialization error:', error);
  }
};

export const fetchEvents = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setError(null));
  
  try {
    const response = await gapi.client.calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });
    
    dispatch(setEvents(response.result.items));
  } catch (error) {
    dispatch(setError('Failed to fetch events'));
    console.error('Error fetching events:', error);
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
    await dispatch(fetchEvents());
    return response;
  } catch (error) {
    dispatch(setError('Failed to create event'));
    console.error('Error creating event:', error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const updateEvent = (eventId, updatedEventDetails) => async (dispatch) => {
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
    dispatch(setError('Failed to update event'));
    console.error('Error updating event:', error);
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
    await dispatch(fetchEvents());
  } catch (error) {
    dispatch(setError('Failed to delete event'));
    console.error('Error deleting event:', error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
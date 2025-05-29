/* global window */
/* eslint-env browser */
/*
  Google Calendar API utility: loads config from Vite .env (never hardcodes keys).
  Handles authentication, event sync, and API calls. See usage in DeadlineDungeon.

  Required .env keys:
    VITE_GOOGLE_API_KEY
    VITE_GOOGLE_CLIENT_ID
*/

const GOOGLE_DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const GOOGLE_SCOPES = "https://www.googleapis.com/auth/calendar.events";

// PUBLIC_INTERFACE
/**
 * Initialize the Google API client (gapi)
 * @returns {Promise<void>}
 */
export async function initGoogleAPI() {
  // Dynamically load gapi script if not already present
  if (!window.gapi) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
  return new Promise((resolve, reject) => {
    window.gapi.load("client:auth2", async () => {
      try {
        await window.gapi.client.init({
          apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          discoveryDocs: GOOGLE_DISCOVERY_DOCS,
          scope: GOOGLE_SCOPES,
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}

// PUBLIC_INTERFACE
/**
 * Check if user is signed into Google (for Calendar use)
 * @returns {boolean}
 */
export function isUserSignedIn() {
  return (
    window.gapi &&
    window.gapi.auth2 &&
    window.gapi.auth2.getAuthInstance() &&
    window.gapi.auth2.getAuthInstance().isSignedIn.get()
  );
}

// PUBLIC_INTERFACE
/**
 * Prompt Google sign-in if not signed in; resolves user profile
 * @returns {Promise<gapi.auth2.GoogleUser>}
 */
export async function signInWithGoogle() {
  await initGoogleAPI();
  if (!isUserSignedIn()) {
    return window.gapi.auth2.getAuthInstance().signIn();
  }
  return window.gapi.auth2.getAuthInstance().currentUser.get();
}

// PUBLIC_INTERFACE
/**
 * Sign out from Google (for disconnecting calendar)
 * @returns {Promise<void>}
 */
export async function signOutGoogle() {
  if (isUserSignedIn()) {
    return window.gapi.auth2.getAuthInstance().signOut();
  }
}

// --- CALENDAR CRUD UTILS ---

// PUBLIC_INTERFACE
/**
 * Fetches upcoming events from user's primary Google Calendar.
 * @param {number} maxResults
 */
export async function fetchCalendarEvents(maxResults = 20) {
  await initGoogleAPI();
  if (!isUserSignedIn()) throw new Error("Not signed into Google Calendar.");
  const resp = await window.gapi.client.calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults,
    orderBy: "startTime",
  });
  return resp.result.items;
}

// PUBLIC_INTERFACE
/**
 * Adds or updates an event in Google Calendar.
 * @param {object} { summary, description, start, end, id }
 * @returns {Promise<object>} The created/updated calendar event
 */
export async function upsertCalendarEvent({ summary, description, start, end, id }) {
  await initGoogleAPI();
  if (!isUserSignedIn()) throw new Error("Not signed into Google Calendar.");

  if (id) {
    // Update existing
    return window.gapi.client.calendar.events.update({
      calendarId: "primary",
      eventId: id,
      resource: { summary, description, start, end },
    });
  } else {
    // Create new
    return window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: { summary, description, start, end },
    });
  }
}

// PUBLIC_INTERFACE
/**
 * Deletes an event from Google Calendar.
 * @param {string} eventId
 */
export async function deleteCalendarEvent(eventId) {
  await initGoogleAPI();
  if (!isUserSignedIn()) throw new Error("Not signed into Google Calendar.");
  return window.gapi.client.calendar.events.delete({
    calendarId: "primary",
    eventId,
  });
}

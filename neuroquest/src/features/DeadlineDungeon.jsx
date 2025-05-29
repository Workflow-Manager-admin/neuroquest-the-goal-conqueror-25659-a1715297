import React, { useEffect, useState } from "react";
import {
  initGoogleAPI,
  signInWithGoogle,
  isUserSignedIn,
  fetchCalendarEvents,
  upsertCalendarEvent,
  deleteCalendarEvent,
} from "../googleCalendar";

/**
 * DeadlineDungeon now syncs with Google Calendar:
 * - Lists upcoming events from user's calendar
 * - Lets user add new deadlines (as events)
 * - Changes here update Google Calendar, and calendar events sync into app
 * - All sensitive API keys are loaded from .env via Vite import.meta.env
 */

function DeadlineDungeon() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Fields for new event
  const [newSummary, setNewSummary] = useState("");
  const [newDeadlineDate, setNewDeadlineDate] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  // Load calendar events, sign in if needed
  async function refreshEvents() {
    setLoading(true);
    setError("");
    try {
      await initGoogleAPI();
      if (!isUserSignedIn()) {
        await signInWithGoogle();
        setSignedIn(true);
      } else {
        setSignedIn(true);
      }
      const items = await fetchCalendarEvents();
      setEvents(items || []);
    } catch (err) {
      setError("Google Calendar sync error: " + (err?.message || err));
    }
    setLoading(false);
  }

  useEffect(() => {
    refreshEvents();
    // Optionally: Add gapi auth status change listener for live UI updates
    // window.gapi?.auth2?.getAuthInstance().isSignedIn.listen(setSignedIn);
    // eslint-disable-next-line
  }, []);

  // Add new deadline
  async function handleAddDeadline(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!newSummary.trim() || !newDeadlineDate) {
        setError("Please enter both summary & date.");
        setLoading(false);
        return;
      }
      // Google Calendar needs date in RFC3339 format
      const start = { dateTime: new Date(newDeadlineDate).toISOString() };
      const end = { dateTime: new Date(new Date(newDeadlineDate).getTime() + 3600000).toISOString() }; // 1hr duration
      const res = await upsertCalendarEvent({
        summary: newSummary,
        start,
        end,
        description: "Added via NeuroQuest Dungeon",
      });
      setNewSummary("");
      setNewDeadlineDate("");
      await refreshEvents();
    } catch (err) {
      setError("Could not add deadline: " + (err?.message || err));
      setLoading(false);
    }
  }

  // Remove event from Calendar
  async function handleRemoveEvent(eventId) {
    setLoading(true);
    setError("");
    try {
      await deleteCalendarEvent(eventId);
      await refreshEvents();
    } catch (err) {
      setError("Failed to remove deadline: " + (err?.message || err));
      setLoading(false);
    }
  }

  return (
    <section>
      <h2 className="font-bold text-2xl pb-2 neon-text flex items-center gap-2">
        Deadline Dungeon
        <span className="text-xl text-accent">⏳</span>
        {signedIn && (
          <span className="ml-4 text-sm text-accent font-mono bg-green-900/40 px-2 py-1 rounded">
            Google Synced
          </span>
        )}
      </h2>
      <div className="rounded-xl bg-[#3a2236]/80 border border-red-500 shadow p-4">
        {error && (
          <div className="text-red-400 mb-3 text-md animate-pulse">{error}</div>
        )}

        <form className="flex flex-col sm:flex-row gap-3 mb-6" onSubmit={handleAddDeadline}>
          <input
            type="text"
            className="bg-black/30 border border-primary/50 rounded-lg px-3 py-2 text-white flex-1"
            placeholder="Add a new boss battle (deadline)..."
            value={newSummary}
            onChange={e => setNewSummary(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="datetime-local"
            className="bg-black/30 border border-red-400/60 rounded-lg px-3 py-2 text-white"
            value={newDeadlineDate}
            onChange={e => setNewDeadlineDate(e.target.value)}
            disabled={loading}
            required
          />
          <button
            className="bg-accent text-black px-4 py-2 rounded-lg neon-glow-bar font-bold disabled:opacity-60"
            disabled={loading || !newSummary || !newDeadlineDate}
            type="submit"
          >
            {loading ? "Syncing..." : "Add Deadline"}
          </button>
        </form>
        <div>
          <h3 className="font-bold text-accent text-lg mb-2">Upcoming Deadlines & Boss Battles</h3>
          {loading ? (
            <div className="text-accent animate-pulse">Loading from your Google Calendar...</div>
          ) : (
            <ul className="space-y-3">
              {(events && events.length)
                ? events.map(ev => (
                  <li
                    key={ev.id}
                    className="p-3 rounded bg-[#45182f]/70 border-l-4 border-accent flex justify-between items-center"
                  >
                    <div>
                      <div className="font-bold text-lg">
                        {ev.summary || <span className="italic text-zinc-400">[Untitled]</span>}
                      </div>
                      <div className="text-zinc-400 text-sm">
                        {(ev.start?.dateTime || ev.start?.date || "")?.replace("T", " ").slice(0, 16)}
                        {ev.description && <span className="italic"> — {ev.description}</span>}
                      </div>
                    </div>
                    <button
                      className="ml-4 text-red-300 hover:text-red-500 text-xl"
                      title="Remove from Google Calendar"
                      onClick={() => handleRemoveEvent(ev.id)}
                      disabled={loading}
                      aria-label="Remove event"
                    >
                      ✖
                    </button>
                  </li>
                ))
                : <div className="text-zinc-400 italic">No upcoming deadlines on your Google Calendar.</div>
              }
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default DeadlineDungeon;

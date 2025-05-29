import React, { useEffect, useState } from "react";
import {
  initGoogleAPI,
  signInWithGoogle,
  isUserSignedIn,
  fetchCalendarEvents,
  upsertCalendarEvent,
  deleteCalendarEvent,
} from "../googleCalendar";
import QuestTaskItem from "../components/QuestTaskItem";
import { Lottie } from "../lottieEntry";

/**
 * DeadlineDungeon: Modern card-style UI for Google Calendar-synced deadlines.
 * - Uses QuestTaskItem for each deadline.
 * - Lottie animation feedback on add/remove.
 * - Colorful card zones, rich accent gradients, animated transitions.
 */

import lottieConfetti from "../assets/lottie_confetti.json"; // Placeholder (must exist or be replaced as needed)
import lottieDelete from "../assets/lottie_delete.json"; // Placeholder, see above

function DeadlineDungeon() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Fields for new event
  const [newSummary, setNewSummary] = useState("");
  const [newDeadlineDate, setNewDeadlineDate] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  // Lottie triggers
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // For add/delete transition UI feedback
  const [lastAction, setLastAction] = useState("");

  // Load calendar events, sign in if needed
  async function refreshEvents(showAnim = false) {
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
      if (showAnim && lastAction === "add") {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1050);
      }
      if (showAnim && lastAction === "delete") {
        setShowDelete(true);
        setTimeout(() => setShowDelete(false), 950);
      }
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
      await upsertCalendarEvent({
        summary: newSummary,
        start,
        end,
        description: "Added via NeuroQuest Dungeon",
      });
      setNewSummary("");
      setNewDeadlineDate("");
      setLastAction("add");
      await refreshEvents(true);
    } catch (err) {
      setError("Could not add deadline: " + (err?.message || err));
      setLoading(false);
    }
  }

  // Remove event from Calendar OR mark as complete (with animation)
  async function handleRemoveEvent(eventId) {
    setLoading(true);
    setError("");
    try {
      await deleteCalendarEvent(eventId);
      setLastAction("delete");
      await refreshEvents(true);
    } catch (err) {
      setError("Failed to remove deadline: " + (err?.message || err));
      setLoading(false);
    }
  }

  // Accent color for card background
  const dungeonBg = "bg-gradient-to-br from-[#422953]/80 via-[#2a191e]/90 to-[#231428] backdrop-blur-lg";

  // Render deadline as QuestTaskItem with accent and action controls
  function renderDeadline(ev) {
    const label = ev.summary || "[Untitled]";
    const dateStr =
      (ev.start?.dateTime || ev.start?.date || "")
        ?.replace("T", " ")
        .slice(0, 16);

    return (
      <div
        key={ev.id}
        className="transition-all duration-700 animate-fadein"
      >
        <QuestTaskItem
          label={`${label} `}
          completed={false}
          onToggle={() => handleRemoveEvent(ev.id)}
          category="deadline"
          // Optional: Add Lottie confetti for completion
          lottieSuccessSrc={lottieDelete}
        />
        <div className="ml-8 mb-1 flex flex-row items-center gap-3 text-xs text-zinc-400">
          <span>
            <span className="font-bold text-accent">⏳</span> {dateStr}
          </span>
          {ev.description && (
            <span className="italic text-zinc-500">
              — {ev.description}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full max-w-3xl mx-auto px-2 md:px-6 py-6 animate-fadein-up">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="font-bold text-2xl md:text-3xl neon-text pb-2 flex items-center gap-2 tracking-tight">
          <span>Deadline Dungeon</span>
          <span className="text-accent text-2xl">⏳</span>
        </h2>
        {signedIn && (
          <span className="ml-2 text-xs md:text-sm text-accent font-mono bg-green-900/40 px-2 py-1 rounded">
            Google Synced
          </span>
        )}
        <span className="ml-auto">
          {(showSuccess && lottieConfetti) && (
            <span style={{ width: 66, height: 66 }}>
              <Lottie animationData={lottieConfetti} autoplay loop={false} style={{ width: 66, height: 66 }} speed={1.25} />
            </span>
          )}
          {(showDelete && lottieDelete) && (
            <span style={{ width: 50, height: 50 }}>
              <Lottie animationData={lottieDelete} autoplay loop={false} style={{ width: 50, height: 50 }} speed={1.2} />
            </span>
          )}
        </span>
      </div>
      <div className={`rounded-3xl border-4 border-[#ff3c7d] shadow-neon ${dungeonBg} p-6 md:p-8 mb-5 transition-all duration-700 animate-slidein-up`}>
        {error && (
          <div className="text-red-400 mb-3 text-md animate-pulse">{error}</div>
        )}

        <form
          className="flex flex-col sm:flex-row gap-3 mb-7 animate-fadein"
          onSubmit={handleAddDeadline}
        >
          <input
            type="text"
            className="bg-black/40 border-2 border-primary/60 rounded-xl px-3 py-2 text-white font-semibold flex-1 shadow neon-glow-bar focus:outline-accent"
            placeholder="Add a new Boss Battle or Quest Deadline..."
            value={newSummary}
            onChange={e => setNewSummary(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="datetime-local"
            className="bg-black/40 border-2 border-red-400/60 rounded-xl px-3 py-2 text-white font-semibold shadow neon-glow-bar focus:outline-accent"
            value={newDeadlineDate}
            onChange={e => setNewDeadlineDate(e.target.value)}
            disabled={loading}
            required
          />
          <button
            className="bg-gradient-to-r from-[#ff3c7d] to-[#7c3aed] text-white px-5 py-2 rounded-2xl font-bold neon-glow-bar shadow transition hover:scale-105 focus:outline-accent disabled:opacity-60"
            disabled={loading || !newSummary || !newDeadlineDate}
            type="submit"
          >
            {loading ? "Syncing..." : "Add Deadline"}
          </button>
        </form>
        <div>
          <h3 className="font-bold text-[#ff3c7d] text-lg mb-4 flex items-center gap-2">
            Upcoming Deadlines & Boss Battles
            <span className="text-xl">👾</span>
          </h3>
          <div>
            {loading ? (
              <div className="text-accent animate-pulse mb-4">Loading from your Google Calendar...</div>
            ) : (
              <div className="flex flex-col gap-4 transition-all duration-700">
                {(events && events.length)
                  ? events.map(renderDeadline)
                  : (
                    <div className="text-zinc-400 italic">No upcoming deadlines on your Google Calendar.</div>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Subtle bottom Lottie for fun ambient effect */}
      <div className="w-full flex justify-center mt-2 animate-fadein-up-slow">
        <span className="opacity-80 pointer-events-none" style={{ width: 96 }}>
          {/* Could swap for atmospheric Lottie if desired */}
        </span>
      </div>
    </section>
  );
}

export default DeadlineDungeon;

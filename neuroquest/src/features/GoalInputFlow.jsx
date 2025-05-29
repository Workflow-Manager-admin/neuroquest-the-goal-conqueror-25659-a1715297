import React, { useState } from "react";
import { fetchAICompletion } from "../openai";

// PUBLIC_INTERFACE
/** GoalInputFlow
 * Lets the user enter a major goal, then shows a smart breakdown from OpenAI.
 * Integrated with QuestMaster AI instructions.
 */
function GoalInputFlow({ onAcceptBreakdown }) {
  const [goalText, setGoalText] = useState("");
  const [breakdown, setBreakdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBreakdown("");
    setLoading(true);
    try {
      const result = await fetchAICompletion(goalText);
      setBreakdown(result || "[No breakdown returned]");
    } catch (err) {
      setError("Could not fetch quest breakdown: " + (err?.message || ""));
    }
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-xl mt-8 mb-10 bg-[#1e1b31]/80 rounded-xl shadow-neon p-6 flex flex-col items-center border-2 border-primary backdrop-blur-md">
      <h2 className="font-bold text-2xl md:text-3xl pb-1 neon-text mb-2">
        Start Your Adventure!
      </h2>
      <p className="text-accent mb-4">
        What is your great quest? Enter your main goal, and QuestMaster AI will break it down into quests!
      </p>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <textarea
          className="bg-[#19193C] p-3 border border-primary/60 rounded-lg focus:outline-accent text-lg resize-none min-h-[70px]"
          placeholder='E.g. "Crack GATE CS 2025" or "Launch my first indie game"'
          value={goalText}
          onChange={e => setGoalText(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="neon-glow-bar py-2 px-8 bg-primary/90 hover:bg-accent/90 text-white text-lg rounded-2xl transition font-semibold"
          disabled={loading || !goalText.trim()}
        >
          {loading ? "Summoning QuestMaster..." : "Generate Quest Breakdown"}
        </button>
      </form>
      {error && <div className="text-red-400 mt-3 font-medium text-sm animate-pulse">{error}</div>}
      {breakdown && !loading && (
        <div className="mt-8 w-full bg-black/40 rounded-lg border border-accent p-4 text-white shadow-lg">
          <h3 className="font-bold text-accent text-lg mb-2">
            🧙 QuestMaster AI says:
          </h3>
          <pre className="whitespace-pre-wrap font-mono text-md">{breakdown}</pre>
          {onAcceptBreakdown && (
            <button
              className="mt-4 neon-glow-bar py-2 px-6 bg-accent/90 hover:bg-primary text-black font-bold rounded-xl transition"
              onClick={() => onAcceptBreakdown(breakdown)}
            >
              Accept and Start Quest
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default GoalInputFlow;

import React, { useState } from "react";
import GoalInputFlow from "./GoalInputFlow";

/**
 * Dashboard page: now starts with AI-powered goal breakdown.
 */
function Dashboard() {
  // In production you would store breakdown in user state or backend
  const [questBreakdown, setQuestBreakdown] = useState(null);

  // Accept breakdown from GoalInputFlow (future: saves as user's quest structure)
  function acceptBreakdown(breakdownText) {
    setQuestBreakdown(breakdownText);
  }

  return (
    <section>
      {!questBreakdown ? (
        <GoalInputFlow onAcceptBreakdown={acceptBreakdown} />
      ) : (
        <>
          <h2 className="font-bold text-2xl md:text-3xl pb-2 neon-text">Quest Log</h2>
          <div className="rounded-xl bg-[#20234a]/70 border border-[#312273] shadow-lg p-4 mt-2">
            <pre className="whitespace-pre-wrap text-accent font-mono text-lg">{questBreakdown}</pre>
            <button
              className="mt-4 bg-accent text-black px-6 py-2 rounded-lg font-bold neon-glow-bar hover:bg-primary hover:text-white transition"
              onClick={() => setQuestBreakdown(null)}
            >
              Change Main Goal
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Dashboard;

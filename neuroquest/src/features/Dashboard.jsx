import React, { useState } from "react";
import GoalInputFlow from "./GoalInputFlow";
import QuestTaskItem from "../components/QuestTaskItem";

/**
 * Dashboard page: UI-polished quest/task manager, grouped and animated.
 *
 * - Shows grouped quest/tasks (Main Questline, Side, Daily, etc) using QuestTaskItem.
 * - Animated group transitions and progress bars.
 * - Modern, responsive, accessible visual elements and spacing.
 * - Smooth transitions and Lottie for completed quests/milestones.
 */

// Sample Lottie confetti (could load actual animation via props)
// For demonstration, we keep this null.
const lottieConfetti = null;

// --- Utility: Breakdown Parsing ---
// Expects AI format: sections for Main Questline, Side Quests, Daily Tasks
function parseQuestBreakdown(text = "") {
  if (!text) return {};
  // Split by anticipated headers, robust to some format variations
  const groups = {};
  const lines = text.split("\n");
  let current = "";
  for (let line of lines) {
    const norm = line.trim();
    if (/^(Main Quest(line)?)/i.test(norm)) current = "main";
    else if (/^Weekly Side/i.test(norm) || /^Side Quest/i.test(norm)) current = "side";
    else if (/^Daily/i.test(norm)) current = "daily";
    else if (/^[-*]\s*(.+)/.test(norm) || /^\d+\./.test(norm)) {
      // Task line; add to current group
      if (current) {
        if (!groups[current]) groups[current] = [];
        const task = norm.replace(/^[-*]\s*/, "").replace(/^\d+\.\s*/, "");
        groups[current].push(task);
      }
    }
  }
  return groups;
}

function calculateProgress(tasks = [], completed = []) {
  if (!tasks.length) return 0;
  return Math.round((completed.filter((_, idx) => tasks[idx]).length / tasks.length) * 100);
}

// --- Component ---
function Dashboard() {
  const [questBreakdown, setQuestBreakdown] = useState(null);

  // Demo-complete state storage for checked off tasks
  const [completed, setCompleted] = useState({
    main: [],
    side: [],
    daily: [],
  });

  // Handle check-toggle (with brief animated feedback)
  function handleToggle(group, idx) {
    setCompleted(prev => {
      const arr = prev[group] || [];
      // Toggle check
      const exists = arr.includes(idx);
      const next = exists ? arr.filter(i => i !== idx) : [...arr, idx];
      return { ...prev, [group]: next };
    });
  }

  // Accept breakdown from GoalInputFlow (parse and reset completions)
  function acceptBreakdown(breakdownText) {
    setQuestBreakdown(breakdownText);
    setCompleted({ main: [], side: [], daily: [] });
  }

  // Modern layout: animated cards per quest group with progress bars & smooth transitions
  let questGroups = parseQuestBreakdown(questBreakdown);

  return (
    <section className="w-full max-w-4xl mx-auto px-1 sm:px-4 py-6 animate-fadein-up">
      {!questBreakdown ? (
        <GoalInputFlow onAcceptBreakdown={acceptBreakdown} />
      ) : (
        <>
          <div className="flex flex-row justify-between items-center mb-3 gap-2">
            <h2 className="font-bold text-2xl md:text-3xl neon-text drop-shadow-neon tracking-tight">Quest Log</h2>
            <button
              className="bg-accent/80 hover:bg-primary neon-glow-bar text-black hover:text-white px-4 py-2 font-bold rounded-2xl transition shadow focus:outline-none"
              onClick={() => setQuestBreakdown(null)}
              tabIndex={0}
            >
              Change Main Goal
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 mb-5 w-full">
            {/* Main Questline */}
            <QuestGroupCard
              title="Main Questline"
              icon="⚔️"
              color="from-[#a991f7] to-[#7c3aed]"
              items={questGroups.main || []}
              groupKey="main"
              completed={completed.main}
              onToggleIdx={idx => handleToggle("main", idx)}
            />
            {/* Side Quests */}
            <QuestGroupCard
              title="Weekly Side Quests"
              icon="🧭"
              color="from-[#4ade80] to-[#089d78]"
              items={questGroups.side || []}
              groupKey="side"
              completed={completed.side}
              onToggleIdx={idx => handleToggle("side", idx)}
            />
            {/* Daily Microtasks */}
            <QuestGroupCard
              title="Daily Microtasks"
              icon="🌄"
              color="from-[#facc15] to-[#f81d1d]"
              items={questGroups.daily || []}
              groupKey="daily"
              completed={completed.daily}
              onToggleIdx={idx => handleToggle("daily", idx)}
            />
          </div>
          {/* Progress Summary Zone */}
          <div className="rounded-xl bg-[#260c3e]/60 shadow-neon border-l-8 border-accent px-6 py-3 flex flex-col md:flex-row items-center gap-2 md:gap-8 animate-fadein-up-slow">
            <span className="text-xl font-fantasy">Adventure Progress:</span>
            <ProgressMeter
              label="Main"
              percent={calculateProgress(questGroups.main || [], completed.main)}
              color="from-[#a991f7] to-[#7c3aed]"
            />
            <ProgressMeter
              label="Side"
              percent={calculateProgress(questGroups.side || [], completed.side)}
              color="from-[#4ade80] to-[#089d78]"
            />
            <ProgressMeter
              label="Daily"
              percent={calculateProgress(questGroups.daily || [], completed.daily)}
              color="from-[#facc15] to-[#f81d1d]"
            />
          </div>
        </>
      )}
    </section>
  );
}

// --- Group Card component with transitions and progress bar ---
function QuestGroupCard({ title, icon, color, items = [], completed = [], onToggleIdx, groupKey }) {
  return (
    <article
      className={`rounded-2xl border-4 border-accent shadow-neon bg-gradient-to-br ${color}/30 p-5 flex flex-col
      transition-all duration-400 hover:scale-[1.025] group min-h-[280px] animate-slidein-up`}
      tabIndex={0}
      aria-label={title}
    >
      <header className="flex flex-row items-center gap-2 mb-4">
        <span className="text-2xl md:text-3xl drop-shadow-neon">{icon}</span>
        <h3 className="font-bold text-lg md:text-xl drop-shadow-neon font-fantasy tracking-tight">{title}</h3>
      </header>
      <div className="flex flex-col gap-3">
        {items.length
          ? items.map((label, idx) => (
            <div key={idx} className="transition-all duration-700 animate-fadein">
              <QuestTaskItem
                label={label}
                completed={completed.includes(idx)}
                onToggle={() => onToggleIdx(idx)}
                category={groupKey}
                lottieSuccessSrc={null}
              />
            </div>
          ))
          : <span className="italic text-zinc-400 text-base">No quests here yet!</span>}
      </div>
      {/* Group Progress bar */}
      <div className="mt-auto pt-3">
        <ProgressMeter
          percent={
            items.length
              ? Math.round((completed.length / items.length) * 100)
              : 0
          }
          color={color}
          small
        />
      </div>
    </article>
  );
}

// --- Progress Meter : smooth gradient neon bar with transition ---
function ProgressMeter({ label, percent = 0, color = "from-accent to-primary", small = false }) {
  return (
    <div className={small
      ? "w-full mt-1"
      : "w-48 min-w-[140px] flex flex-col items-center gap-1 mx-2"}>
      {label && <span className="font-bold text-xs text-accent uppercase tracking-wider mb-0.5">{label}</span>}
      <div className={`w-full h-3 ${small ? "h-2" : "h-3"} rounded-lg bg-black/30 border border-accent/60 shadow-neon overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${color} neon-glow-bar transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-mono text-accent">{percent}%</span>
    </div>
  );
}

export default Dashboard;

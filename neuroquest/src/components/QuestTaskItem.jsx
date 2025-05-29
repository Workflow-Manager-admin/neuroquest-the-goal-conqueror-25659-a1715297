import React, { useRef, useState } from "react";
import { Lottie } from "../lottieEntry";

/**
 * QuestTaskItem
 * A modern, responsive, checkable quest/task item with micro-animation and optional Lottie feedback.
 *
 * Props:
 * - label (string): The task/quest content.
 * - completed (bool): Is this task completed?
 * - onToggle (fn): Called when the task is toggled.
 * - category (string): "main" | "side" | "daily" | "deadline" (affects accent color)
 * - lottieSuccessSrc (object): Optional - Lottie JSON for success animation
 */
 // PUBLIC_INTERFACE
function QuestTaskItem({
  label,
  completed = false,
  onToggle,
  category = "main",
  lottieSuccessSrc,
}) {
  const [justCompleted, setJustCompleted] = useState(false);
  const [rippleXY, setRippleXY] = useState(null);

  // Accent color by category
  const accentMap = {
    main: "from-[#a991f7] to-[#7c3aed]",
    side: "from-[#4ade80] to-[#089d78]",
    daily: "from-[#facc15] to-[#f81d1d]",
    deadline: "from-[#ff3c7d] to-[#6e21c2]",
  };
  const accent = accentMap[category] || accentMap.main;

  // Handle check animation + Lottie
  function handleToggle(e) {
    if (onToggle) onToggle();
    if (!completed) {
      setJustCompleted(true);
      // Ripple position
      const rect = e.currentTarget.getBoundingClientRect();
      setRippleXY({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTimeout(() => { setJustCompleted(false); setRippleXY(null); }, 950);
    }
  }

  return (
    <div
      className={`relative group select-none transition-shadow duration-300 
        rounded-2xl overflow-hidden bg-[#190e32]/60
        flex items-center gap-4 shadow-neon px-4 py-3 border-l-4 
        border-accent hover:bg-[#23114a]/80 cursor-pointer 
        ${completed
          ? "opacity-60 grayscale"
          : "hover:scale-[1.02] focus-within:ring-2 focus-within:ring-accent/80"
        }
      `}
      onClick={handleToggle}
      tabIndex={0}
      aria-checked={completed}
      role="checkbox"
    >
      {/* Accent left bar */}
      <span
        className={`block w-2 h-8 rounded bg-gradient-to-b ${accent} flex-shrink-0`}
      />
      {/* Check/markbox */}
      <span className="relative w-6 h-6 mr-1 flex-shrink-0 flex items-center justify-center">
        <span className={`transition-all duration-200 
          inline-flex h-6 w-6 rounded-full border-2 
          ${completed
            ? "border-accent bg-accent/90 scale-110 shadow-neon"
            : "border-zinc-400 bg-black/40 group-hover:border-accent"}
        `}>
          {/* Animated check ✅ */}
          {completed && (
            <svg
              className="stroke-black stroke-2 scale-[1.3] animate-fadein"
              width="18" height="18" viewBox="0 0 18 18">
              <polyline points="4,10 8,15 15,4" fill="none" />
            </svg>
          )}
        </span>
        {/* Ripple animation on check */}
        {justCompleted && rippleXY && (
          <span
            className="absolute pointer-events-none animate-ripple rounded-full bg-accent/40"
            style={{
              width: 36,
              height: 36,
              left: -10,
              top: -10,
              opacity: 0.8,
              transform: `translate(${rippleXY.x - 12}px, ${rippleXY.y - 12}px)`
            }}
          />
        )}
      </span>
      {/* Main label */}
      <span
        className={`flex-1 transition-colors font-semibold text-lg tracking-tight 
          ${completed ? "line-through text-zinc-500" : "text-accent"}
        `}
        title={label}
      >
        {label}
      </span>
      {/* Lottie confetti animation */}
      {justCompleted && !!lottieSuccessSrc && (
        <span className="absolute right-1 top-1 z-10 pointer-events-none" style={{ width: 60, height: 60 }}>
          <Lottie animationData={lottieSuccessSrc} autoplay loop={false} style={{height:60, width:60}} speed={1.4} />
        </span>
      )}
    </div>
  );
}

export default QuestTaskItem;

/* Animations - suggested for style.css:
.animate-fadein {
  animation: fadeIn 0.19s cubic-bezier(.4,2,.6,1) both;
}
@keyframes fadeIn {
  0% { opacity: 0; transform: scale(0.7);}
  100% { opacity: 1; transform: scale(1);}
}
.animate-ripple {
  animation: ripplePulse 0.7s cubic-bezier(.5,0,.3,1) both;
}
@keyframes ripplePulse {
  0% { opacity: 0.7; transform: scale(0);}
  60% { opacity: 0.42; }
  100% { opacity: 0; transform: scale(1.7);}
}
*/

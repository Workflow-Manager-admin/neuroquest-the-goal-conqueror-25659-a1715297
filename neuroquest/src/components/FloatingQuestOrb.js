import React from "react";

// PUBLIC_INTERFACE
function FloatingQuestOrb() {
  // Placeholder orb: could be swapped for Lottie in the future
  return (
    <div
      className="fixed bottom-8 right-5 z-50 animate-bounce drop-shadow-neon cursor-pointer hover:scale-105"
      title="Open Quest Creation"
      tabIndex={0}
    >
      <div className="relative">
        <span className="flex h-16 w-16 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4ade80] border-4 border-[#23267e] shadow-neon items-center justify-center text-3xl select-none">
          🧿
        </span>
        <span className="absolute -top-2 -right-2 animate-pulse bg-accent text-white px-2 py-0.5 rounded-full text-xs font-bold shadow">
          +
        </span>
      </div>
    </div>
  );
}

export default FloatingQuestOrb;

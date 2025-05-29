import React from "react";

// PUBLIC_INTERFACE
function TopBar() {
  // Hardcoded demo stats
  const xp = 440, xpMax = 780;
  const hp = 42, hpMax = 100;
  const streak = 5;
  const level = 7;

  return (
    <header className="w-full flex flex-row gap-6 items-center justify-between px-3 md:px-8 py-2 border-b border-[#322367]/70 bg-[#1b1533]/70 backdrop-blur-sm z-20">
      {/* App logo/brand */}
      <span className="font-fantasy text-2xl md:text-3xl tracking-tight font-bold flex items-center gap-2 neon-text">
        NeuroQuest <span className="text-primary">&#9889;</span>
      </span>
      {/* XP/HP bars */}
      <div className="flex flex-row items-center gap-6 flex-1 justify-center max-w-2xl">
        <StatBar variant="xp" value={xp} max={xpMax} />
        <StatBar variant="hp" value={hp} max={hpMax} />
        <div className="flex flex-col items-center">
          <span className="font-bold text-accent text-md">Streak {streak}🔥</span>
          <span className="text-xs text-zinc-300">Lvl {level}</span>
        </div>
      </div>
      {/* Placeholder for quick actions */}
      <div />
    </header>
  );
}

// XP/HP neon bars
function StatBar({ variant, value, max }) {
  const pct = (100 * value) / Math.max(1, max);
  const barColors = {
    xp: "from-[#7c3aed] to-[#4ade80]",
    hp: "from-red-500 to-rose-400"
  };
  const label = variant === "xp" ? "XP" : "HP";
  const barColor = barColors[variant];

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs uppercase tracking-wide font-bold mb-1">{label}</span>
      <div className="rounded-lg bg-black/30 border-2 border-[#33296b] w-32 h-4 flex items-center shadow-lg overflow-hidden">
        <div
          style={{ width: `${pct}%` }}
          className={`h-full bg-gradient-to-r ${barColor} neon-glow-bar`}
        />
      </div>
      <span className="text-xs">
        {value}/{max}
      </span>
    </div>
  );
}

export default TopBar;

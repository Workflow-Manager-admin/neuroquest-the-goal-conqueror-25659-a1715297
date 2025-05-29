import React from "react";
import { Link, useLocation } from "react-router-dom";

// Demo avatar and cosmetic icon
const demoAvatar = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f9d9.png";

// Sidebar navigation routes mapping
const navLinks = [
  { path: "/dashboard", label: "Quest Log", icon: "📝" },
  { path: "/focus-forest", label: "Focus Forest", icon: "🌲" },
  { path: "/deadline-dungeon", label: "Deadline Dungeon", icon: "⏳" },
  { path: "/daily-hills", label: "Daily Hills", icon: "☀️" },
  { path: "/inventory", label: "Inventory", icon: "🎒" },
  { path: "/settings", label: "Settings", icon: "⚙️" }
];

// PUBLIC_INTERFACE
function Sidebar() {
  const location = useLocation();

  return (
    <aside className="bg-[#16192c]/60 backdrop-blur-lg border-r border-[#2f255f] min-h-0 flex flex-col w-20 md:w-64 transition-all duration-300 shadow-xl z-10">
      <div className="flex flex-col gap-3 items-center md:items-start px-2 pt-7 pb-3">
        {/* Avatar section */}
        <div className="mb-2">
          <img
            src={demoAvatar}
            alt="Avatar"
            className="w-14 h-14 rounded-full border-4 border-[#7c3aed] neon-glow"
          />
        </div>
        <div className="hidden md:block text-center w-full">
          <div className="text-lg font-semibold">Adventurer</div>
          <span className="text-sm text-accent">Level 7 Sorcerer</span>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-1 px-2">
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              flex items-center gap-3 py-3 px-4 rounded-lg font-medium transition 
              ${location.pathname === link.path
                ? "bg-gradient-to-br from-[#7c3aed]/70 to-[#4ade80]/60 shadow-neon"
                : "hover:bg-[#23245a]/70"}
             `}
            tabIndex={0}
          >
            <span className="text-xl drop-shadow-neon">{link.icon}</span>
            <span className="hidden md:inline">{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto hidden md:flex flex-col items-center gap-2 ">
        {/* Placeholder for extra cosmetic or reward buttons */}
        <span className="text-accent text-xs font-mono animate-pulse">🪙 145 Soul Tokens</span>
      </div>
    </aside>
  );
}

export default Sidebar;

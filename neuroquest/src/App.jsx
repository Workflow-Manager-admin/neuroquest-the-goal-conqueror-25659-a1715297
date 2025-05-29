import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import FloatingQuestOrb from "./components/FloatingQuestOrb.jsx";

// Feature entry points
import Dashboard from "./features/Dashboard.jsx"; // Overview/Quest Log + XP/HP bars
import FocusForest from "./features/FocusForest.jsx";
import DeadlineDungeon from "./features/DeadlineDungeon.jsx";
import DailyHills from "./features/DailyHills.jsx";
import BossBattleOverlay from "./features/BossBattleOverlay.jsx";
import Inventory from "./features/Inventory.jsx";
import Settings from "./features/Settings.jsx";
import Login from "./features/Login.jsx";

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#141024] to-[#24156a] min-h-screen flex flex-col text-white transition-colors duration-500">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 relative px-2 sm:px-4 pt-4 overflow-x-hidden">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/focus-forest" element={<FocusForest />} />
            <Route path="/deadline-dungeon" element={<DeadlineDungeon />} />
            <Route path="/daily-hills" element={<DailyHills />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/settings" element={<Settings />} />
            {/* Home and catch-all */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <FloatingQuestOrb />
          <BossBattleOverlay />
        </main>
      </div>
    </div>
  );
}

export default App;

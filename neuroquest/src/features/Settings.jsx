import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

// PUBLIC_INTERFACE
function Settings() {
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // PUBLIC_INTERFACE
  async function handleLogout() {
    setLoggingOut(true);
    setError("");
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      setError("Logout failed. Try again!");
    }
    setLoggingOut(false);
  }

  return (
    <section>
      <h2 className="font-bold text-2xl pb-2 neon-text">Settings</h2>
      <div className="rounded-xl bg-[#23243e]/70 border border-[#888ca5] shadow p-4">
        <ul className="text-zinc-200 space-y-2">
          <li>[Toggle dark/light mode]</li>
          <li>[Toggle animations]</li>
          <li>[Change goal]</li>
          <li>[Start new quest]</li>
          <li>
            <button
              className="mt-2 px-4 py-2 bg-[#1e293b] hover:bg-[#312273] text-white rounded-lg border border-[#7c3aed] shadow neon-glow-bar transition disabled:opacity-60"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? "Logging out..." : "Log Out"}
            </button>
          </li>
        </ul>
        {error && <div className="text-red-400 mt-3 font-medium text-sm animate-pulse">{error}</div>}
      </div>
    </section>
  );
}

export default Settings;

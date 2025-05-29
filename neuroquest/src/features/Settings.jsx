import React from "react";

function Settings() {
  return (
    <section>
      <h2 className="font-bold text-2xl pb-2 neon-text">Settings</h2>
      <div className="rounded-xl bg-[#23243e]/70 border border-[#888ca5] shadow p-4">
        <ul className="text-zinc-200 space-y-2">
          <li>[Toggle dark/light mode]</li>
          <li>[Toggle animations]</li>
          <li>[Change goal]</li>
          <li>[Start new quest]</li>
          <li>[Logout]</li>
        </ul>
      </div>
    </section>
  );
}

export default Settings;

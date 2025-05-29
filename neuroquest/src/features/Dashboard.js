import React from "react";

function Dashboard() {
  return (
    <section>
      <h2 className="font-bold text-2xl md:text-3xl pb-2 neon-text">Quest Log</h2>
      <div className="rounded-xl bg-[#20234a]/70 border border-[#312273] shadow-lg p-4 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Each questline group is its own component in future */}
          <div className="p-2">
            <h3 className="font-semibold text-primary text-lg">Main Questline</h3>
            <ul>
              <li className="my-2 p-2 bg-black/40 rounded neon-glow-bar">🚀 Complete AI-powered roadmap</li>
            </ul>
          </div>
          <div className="p-2">
            <h3 className="font-semibold text-green-400 text-lg">Weekly Side Quests</h3>
            <ul>
              <li className="my-2 p-2 bg-black/40 rounded">📚 Read networking chapter</li>
            </ul>
          </div>
          <div className="p-2">
            <h3 className="font-semibold text-accent text-lg">Daily Microtasks</h3>
            <ul>
              <li className="my-2 p-2 bg-black/40 rounded">📝 Review notes</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

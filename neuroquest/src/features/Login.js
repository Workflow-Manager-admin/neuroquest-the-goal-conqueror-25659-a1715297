import React from "react";

// PUBLIC_INTERFACE
function Login() {
  // Placeholder login with dark overlay
  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#232159] via-[#1f1f35] to-[#7c3aed]/10 border-4 border-[#7c3aed] rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center justify-center neon-glow">
        <h2 className="text-2xl font-bold mb-2 neon-text">Welcome to NeuroQuest</h2>
        <p className="text-zinc-300 text-center mb-8">Sign in to awaken your adventure</p>
        {/* Demo buttons for Firebase Auth, not functional */}
        <button className="bg-[#7c3aed] hover:bg-[#4ade80] text-white text-lg px-8 py-2 rounded-xl mb-3 shadow-md neon-glow transition">
          Sign in with Google
        </button>
        <button className="bg-[#1e293b] hover:bg-[#312273] text-white px-8 py-2 rounded-xl text-md border border-[#7c3aed] shadow neon-glow-bar transition">
          Sign in with Email
        </button>
      </div>
    </div>
  );
}

export default Login;

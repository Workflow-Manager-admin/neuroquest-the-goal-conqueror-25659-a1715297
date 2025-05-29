import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

/*
  PROFESSIONAL, BRANDED AUTH UI:
  - Branded logo, dark theme, responsive glowing panel.
  - Google and Email/Password sign-in, with error handling and loading states.
*/

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // PUBLIC_INTERFACE
  async function handleGoogleSignIn() {
    setError(""); setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed. " + (err?.message || ""));
    }
    setLoading(false);
  }

  // PUBLIC_INTERFACE
  async function handleEmailSubmit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(
        mode === "login"
          ? "Sign in failed. Check credentials."
          : "Could not register: " + (err?.message || "")
      );
    }
    setLoading(false);
  }

  // Brand logo (could use Lottie, SVG, or styled text)
  const logo = (
    <span className="font-fantasy text-3xl tracking-tight font-bold flex items-center gap-3 neon-text">
      <span className="drop-shadow-neon">🧠</span>
      NeuroQuest
      <span className="text-primary">&#9889;</span>
    </span>
  );

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div
        className="bg-gradient-to-br from-[#232159] via-[#1f1f35] to-[#7c3aed]/20 border-4 border-[#7c3aed]
        rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center neon-glow w-full max-w-md relative"
      >
        <div className="mb-6">{logo}</div>
        <h2 className="text-2xl font-bold mb-2 neon-text">
          {mode === "login" ? "Welcome Back!" : "Join the Adventure"}
        </h2>
        <p className="text-zinc-300 text-center mb-5">
          {mode === "login"
            ? "Sign in to awaken your quest."
            : "Create your account to begin conquering goals."}
        </p>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#4ade80] text-lg text-white px-8 py-2 rounded-xl mb-3 shadow-md neon-glow transition w-full"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
          Sign in with Google
        </button>
        <div className="w-full flex items-center my-2 text-zinc-400 text-xs gap-2">
          <span className="flex-1 border-t border-[#5e44c6]/30" />
          <span>or</span>
          <span className="flex-1 border-t border-[#5e44c6]/30" />
        </div>
        <form onSubmit={handleEmailSubmit} className="w-full flex flex-col gap-3">
          <input
            autoFocus
            className="bg-[#16172c] border border-[#7c3aed]/50 text-white p-2 rounded-lg focus:outline-primary w-full"
            type="email"
            value={email}
            autoComplete="username"
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            disabled={loading}
          />
          <input
            className="bg-[#16172c] border border-[#7c3aed]/50 text-white p-2 rounded-lg focus:outline-primary w-full"
            type="password"
            value={password}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            minLength={6}
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-[#1e293b] hover:bg-[#312273] text-white py-2 rounded-xl text-md border border-[#7c3aed] shadow neon-glow-bar transition"
            disabled={loading}
          >
            {mode === "login" ? "Sign in with Email" : "Register with Email"}
          </button>
        </form>
        {error && (
          <div className="text-red-400 mt-3 font-medium text-sm animate-pulse">{error}</div>
        )}
        {loading && (
          <span className="text-accent mt-2 animate-pulse text-sm">Processing...</span>
        )}
        <div className="w-full flex justify-between mt-6 gap-3 text-sm">
          <button
            className="text-accent underline hover:text-primary transition"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            type="button"
            disabled={loading}
          >
            {mode === "login"
              ? "New to NeuroQuest? Register"
              : "Already have an account? Sign in"}
          </button>
          {/* Could add forgot password here in future */}
        </div>
      </div>
    </div>
  );
}

export default Login;

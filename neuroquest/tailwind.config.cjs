/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        secondary: "#0f172a",
        accent: "#4ade80",
      },
      fontFamily: {
        fantasy: ["'Cinzel Decorative'", "'IM Fell English SC'", "'Cinzel'", "serif"],
      },
      boxShadow: {
        neon: "0 0 12px 2px #7c3aed, 0 0 2px #4ade8099",
      }
    },
  },
  plugins: [],
};

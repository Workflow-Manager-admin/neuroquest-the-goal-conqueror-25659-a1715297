# neuroquest-the-goal-conqueror-25659-a1715297

## Firebase & OpenAI & Google Calendar API Setup

**Configuration:**
- Create a file `neuroquest/.env` (see `.env.example`) and fill in your Firebase, OpenAI, and Google API credentials:
  - Firebase (prefix: `VITE_FIREBASE_...`)
  - OpenAI (`VITE_OPENAI_API_KEY`)
  - Google Calendar API (`VITE_GOOGLE_API_KEY`, `VITE_GOOGLE_CLIENT_ID`)
- Never commit real secrets to your repository.
- At deploy, use appropriate `.env.production` with Vite.

**Running Locally:**
- Start dev server: `npm run dev` from `neuroquest` folder.

**Deployment:**
- Set all `VITE_FIREBASE_*`, `VITE_OPENAI_API_KEY`, and `VITE_GOOGLE_*` environment variables in your platform/hosting for production.

**Features:**
- Professionally branded login overlay with both Google and Email/Password options.
- AI-powered quest breakdown via OpenAI GPT.
- Google Calendar sync: bi-directional sync of tasks/deadlines with user's Google Calendar (see "Deadline Dungeon" and task UI).
- Fully environment-based secret handling.
- Modern dark/fantasy RPG UI for all flows.

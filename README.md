# neuroquest-the-goal-conqueror-25659-a1715297

## Firebase Auth Setup (Google & Email/Password)

**Configuration:**
- Create a file `neuroquest/.env` (see `.env.example`) and fill in your Firebase Web App credentials.
- Never commit real secrets to your repository.
- At deploy, use appropriate `.env.production` with Vite.

**Running Locally:**
- Start dev server: `npm run dev` from `neuroquest` folder.

**Deployment:**
- Set all `VITE_FIREBASE_*` environment variables in your platform/hosting for production.

**Features:**
- Professionally branded login overlay with both Google and Email/Password options.
- Fully environment-based secret handling.
- Modern dark/fantasy UI for all login flows.

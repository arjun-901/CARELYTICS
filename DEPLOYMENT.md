# Deployment Guide — CARELYTICS

This file shows recommended steps to deploy the project (frontend, Admin, Hospitalsite) and the backend. It includes Vercel instructions for a monorepo setup and a checklist of environment variables.

Two deployment models
- Option A — Separate projects (recommended):
  - Deploy `frontend`, `Admin`, and `Hospitalsite` as three separate Vercel projects.
  - Deploy `backend` to a server (Render/Heroku/DigitalOcean/AWS) and set its public URL as `VITE_API_BASE` for each frontend project.
  - Pros: independent builds, simpler env management, easier rollback.

- Option B — Single Vercel monorepo (uses `vercel.json`):
  - Keep the repository as-is and use the included `vercel.json` to build the three frontends.
  - Backend must be hosted separately (Vercel Serverless conversion is possible but not in this guide).
  - The `vercel.json` routes `/api/*` requests to your external backend domain — replace the placeholder in `vercel.json` before deploying.

Required environment variables
- Frontend(s) (client-side):
  - `VITE_API_BASE` — Backend base origin (either `https://api.example.com` or `https://api.example.com/api`) — MUST be set before build in Vercel.

- Backend (server-side — set in hosting provider):
  - `MONGODB_URI` — MongoDB connection string
  - `JWT_SECRET` — JWT signing secret
  - `PORT` — optional (defaults to 5000)
  - `FRONTEND_URL` — allowed origin for main frontend (e.g., `https://app.example.com`)
  - `ADMIN_URL` — allowed origin for admin frontend (e.g., `https://admin.example.com`)
  - `HOSPITAL_URL` — allowed origin for hospital portal (e.g., `https://hospital.example.com`)

Vercel-specific notes
- Set `VITE_API_BASE` in the Vercel project settings → Environment Variables → *Production* (and Preview if needed) before the build runs.
- Examples:
  - `VITE_API_BASE = https://api.carelytics.example.com`
  - or `VITE_API_BASE = https://api.carelytics.example.com/api`
- `VITE_` prefixed variables are injected into the client build at build-time only.

vercel.json placeholders
- `vercel.json` currently contains `https://<YOUR_BACKEND_DOMAIN>` in three locations. Replace those placeholders with your backend domain or update routes after adding your backend service.

Backend CORS
- The backend reads `FRONTEND_URL`, `ADMIN_URL`, `HOSPITAL_URL` and restricts CORS to those origins. Ensure these exactly match your deployed frontend origins (including protocol and port if any).

Local testing
- To test locally, set these `.env` files before running:
  - `backend/.env` — add `MONGODB_URI`, `JWT_SECRET`, and locally `FRONTEND_URL=http://localhost:5173`, `ADMIN_URL=http://localhost:5174`, `HOSPITAL_URL=http://localhost:5175`.
  - `frontend/.env`, `Admin/.env`, `Hospitalsite/.env` — set `VITE_API_BASE=http://localhost:5000` (or `http://localhost:5000/api`).

Commands
- Backend (dev):
  ```bash
  cd backend
  npm install
  npm run dev
  ```
- Frontend (dev):
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

Troubleshooting
- CORS errors: check that the browser origin exactly matches one of the allowed backend envs. The backend uses exact matching by default.
- API path errors: `VITE_API_BASE` normalization accepts either origin-only or origin+/api. If you see double `/api` in requests, update `VITE_API_BASE` to an origin-only value and rebuild.

If you want, I can:
- Replace the `vercel.json` placeholders with your actual backend URL now (provide it), or
- Convert the backend into Vercel Serverless functions (non-trivial refactor).


# Hospitalsite Deployment Notes

Short checklist and commands to deploy the `Hospitalsite` app.

1) Environment variable

- `VITE_API_BASE` — set this in your hosting provider before the build step. Use either the origin or include `/api`:
  - `https://api.example.com` (preferred)
  - or `https://api.example.com/api`

2) Build settings

- This app's Vite config sets `base: '/hospital/'`. This makes the built files reference `/hospital/` paths so they work with the monorepo `vercel.json` routes that serve the app under `/hospital`.

3) Local test

```bash
cd Hospitalsite
npm install
# set env: VITE_API_BASE=http://localhost:5000 (or http://localhost:5000/api)
npm run dev

# build for production
npm run build
```

4) Vercel (monorepo) notes

- `vercel.json` is configured to build this package and route `/hospital` to the built app. Ensure the repository `vercel.json` has the correct backend `api` destination and that `VITE_API_BASE` is set in Vercel project settings **before** the build.

5) Troubleshooting

- If assets 404 when visiting `/hospital/...`, ensure the Vite `base` is `/hospital/` and that Vercel deployed the files under the expected route.


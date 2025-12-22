Carelytics backend (Express + MongoDB)

Quick start

1. Copy environment example and edit as needed:

```powershell
cd backend
copy .env.example .env
# edit .env to set MONGODB_URI and JWT_SECRET
```

2. Install dependencies and run seed to create default admin and see token:

```powershell
npm install
npm run seed
```

3. Start server (dev with nodemon or production):

```powershell
npm run dev   # uses nodemon
# or
npm start
```

API endpoints

- `POST /api/admin/login` — body: `{ email, password }` → returns `{ email, name, token }`
- `POST /api/hospitals` — headers: `Authorization: Bearer <token>` body: `{ name, address, hospitalId, password }` → creates hospital (returns created object without password)

Notes

- The seed script creates an admin using `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` from `.env` or defaults `admin@care.com` / `admin123` and prints a JWT. Use that token in the frontend to call `/api/hospitals`.
- Ensure `MONGODB_URI` points to your MongoDB (local or Atlas).

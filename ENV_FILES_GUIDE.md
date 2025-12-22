# CARELYTICS - All Environment Files

This document contains all the .env configuration files you need for the project.

---

## 1. Backend .env

**File Location:** `C:\Users\Anand\Desktop\CARELYTICS\backend\.env`

**Current Content (TESTED & WORKING):**
```
MONGODB_URI=mongodb+srv://arjun9654abc:Virtual%40123@cluster0.xkmsibl.mongodb.net/carelytics
JWT_SECRET=fcghjklvghjkhvggh
SEED_ADMIN_EMAIL=admin@care.com
SEED_ADMIN_PASSWORD=admin123
SEED_ADMIN_NAME=Admin
PORT=5000
```

**What Each Variable Does:**
- `MONGODB_URI` - Connection string to your MongoDB Atlas database
- `JWT_SECRET` - Secret key for signing JWT tokens (change this in production)
- `SEED_ADMIN_EMAIL` - Default admin email created on first seed
- `SEED_ADMIN_PASSWORD` - Default admin password created on first seed
- `SEED_ADMIN_NAME` - Default admin name
- `PORT` - Backend server port (5000)

---

## 2. Admin App .env

**File Location:** `C:\Users\Anand\Desktop\CARELYTICS\Admin\.env`

**Current Content (TESTED & WORKING):**
```
VITE_API_BASE=http://localhost:5000/api
```

**What It Does:**
- Points the Admin app to the backend API
- Used to create and manage hospitals
- Change this if your backend is on a different server

---

## 3. Hospitalsite App .env

**File Location:** `C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite\.env`

**Current Content (TESTED & WORKING):**
```
VITE_API_BASE=http://localhost:5000/api
```

**What It Does:**
- Points the Hospital dashboard to the backend API
- Used by hospitals to login and manage their data
- Change this if your backend is on a different server

---

## 4. Frontend App .env (Optional)

**File Location:** `C:\Users\Anand\Desktop\CARELYTICS\frontend\.env`

**Suggested Content:**
```
VITE_API_BASE=http://localhost:5000/api
```

**What It Does:**
- Main admin frontend for analytics and reports
- Not required for basic hospital operations

---

## Quick Setup Commands

### Copy All Files at Once

```powershell
# These files are already created and working
# Just verify they exist and have the correct content:

# 1. Check backend .env
cat 'C:\Users\Anand\Desktop\CARELYTICS\backend\.env'

# 2. Check Admin .env
cat 'C:\Users\Anand\Desktop\CARELYTICS\Admin\.env'

# 3. Check Hospitalsite .env
cat 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite\.env'
```

---

## Running All Apps

### Quick Start Script

Save this as `start-all.ps1` in your CARELYTICS folder:

```powershell
# CARELYTICS - Start All Apps

$backend = Start-Process powershell -PassThru -ArgumentList @(
    '-NoExit',
    '-Command',
    "cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'; npm run dev"
)

Start-Sleep -Seconds 3

$admin = Start-Process powershell -PassThru -ArgumentList @(
    '-NoExit',
    '-Command',
    "`$env:VITE_API_BASE='http://localhost:5000/api'; cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'; npm run dev"
)

Start-Sleep -Seconds 3

$hospital = Start-Process powershell -PassThru -ArgumentList @(
    '-NoExit',
    '-Command',
    "`$env:VITE_API_BASE='http://localhost:5000/api'; cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'; npm run dev"
)

Write-Host "All apps started:"
Write-Host "Backend: http://localhost:5000"
Write-Host "Admin: http://localhost:5173"
Write-Host "Hospital: http://localhost:5174"
Write-Host "Press Ctrl+C in each terminal to stop"
```

**Usage:**
```powershell
# Run from CARELYTICS folder
.\start-all.ps1
```

---

## Manual Terminal Commands

### Terminal 1: Backend
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm run dev
```

### Terminal 2: Admin App
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'
$env:VITE_API_BASE='http://localhost:5000/api'
npm run dev
```

### Terminal 3: Hospitalsite
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'
$env:VITE_API_BASE='http://localhost:5000/api'
npm run dev
```

---

## URLs to Access

After starting all apps:

1. **Backend API:** http://localhost:5000/
2. **Admin Dashboard:** http://localhost:5173
3. **Hospital Dashboard:** http://localhost:5174

---

## Default Credentials

### Admin Login
- **Email:** admin@care.com
- **Password:** admin123

### Test Hospital (After Creating)
- **Hospital ID:** hosp001
- **Password:** hospital123

---

## Production Deployment Notes

### For Production, Update These:

**Backend .env:**
```
# Change MongoDB URI to production database
MONGODB_URI=mongodb+srv://your-prod-user:your-prod-password@your-prod-cluster.mongodb.net/carelytics

# Change JWT secret to a random, secure value
JWT_SECRET=your-very-long-random-secure-secret-key-here-change-this

# Use production domain
PORT=3000
```

**Admin App .env:**
```
# Change to your production backend URL
VITE_API_BASE=https://your-api-domain.com/api
```

**Hospitalsite App .env:**
```
# Change to your production backend URL
VITE_API_BASE=https://your-api-domain.com/api
```

---

## Troubleshooting .env Issues

### Apps can't connect to backend
1. Verify `VITE_API_BASE` is set correctly
2. Check backend is running: `http://localhost:5000`
3. Check firewall isn't blocking port 5000
4. Restart the app if you changed .env

### MongoDB connection fails
1. Check `MONGODB_URI` is correct
2. Verify MongoDB Atlas cluster allows your IP
3. Check internet connection
4. Try running: `npm run seed` to test connection

### JWT token errors
1. Ensure `JWT_SECRET` is the same in backend and seed
2. Try: `npm run seed` again to generate new tokens
3. Clear browser localStorage and login again

---

## File Structure

```
CARELYTICS/
├── .env (use backend/.env)
├── .gitignore
│
├── backend/
│   ├── .env                 ← Contains MongoDB and JWT settings
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   ├── seedAdmin.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── node_modules/
│
├── Admin/
│   ├── .env                 ← Contains API base URL
│   ├── package.json
│   ├── src/
│   └── node_modules/
│
├── Hospitalsite/
│   ├── .env                 ← Contains API base URL
│   ├── package.json
│   ├── src/
│   └── node_modules/
│
├── frontend/
│   ├── .env                 ← Optional: Contains API base URL
│   ├── package.json
│   ├── src/
│   └── node_modules/
│
├── SETUP_GUIDE.md          ← Complete setup instructions
└── DATABASE_TEST_REPORT.md ← Database verification results
```

---

## Summary

✅ **All environment files are configured and tested**
✅ **MongoDB connection is working**
✅ **Admin and Hospital apps can communicate with backend**
✅ **Ready for development and testing**

You can now start all applications and begin testing the system!


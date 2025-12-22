# 🚀 CARELYTICS - COMPLETE STARTUP GUIDE

## System Overview

Your complete hospital management system consists of:

1. **Backend** (Express.js + MongoDB) - Port 5000
2. **Admin Frontend** (React) - Port 5173
3. **Hospitalsite** (React) - Port 5174
4. **Main Frontend Dashboard** (React) - Port 5175

---

## ⚡ Quick Start (4 Steps)

### Step 1: Open 4 Terminals

Open 4 separate PowerShell windows for:
1. Backend server
2. Admin app
3. Hospital site
4. Main dashboard

### Step 2: Start Backend

**Terminal 1:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm run dev
```

**Expected output:**
```
Connected to MongoDB
Server running on port 5000
```

### Step 3: Start All Frontends

**Terminal 2 (Admin):**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'
npm run dev
```

**Terminal 3 (Hospitalsite):**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'
npm run dev
```

**Terminal 4 (Main Dashboard):**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\frontend'
npm run dev
```

### Step 4: Access Applications

Open in your browser:

1. **Admin Dashboard** → http://localhost:5173
   - Create hospitals here
   - View all hospital data
   - Default: admin@care.com / admin123

2. **Hospital Portal** → http://localhost:5174
   - Hospital login
   - Manage hospital operations
   - Update beds, medicine, blood, ambulances

3. **Main Dashboard** → http://localhost:5175
   - View all hospitals
   - Real-time monitoring
   - Hospital statistics
   - Requires admin login

---

## 📱 Application Workflows

### Workflow 1: Setup New Hospital (Admin)

1. Open Admin Dashboard: http://localhost:5173
2. Login with admin@care.com / admin123
3. Go to "Add Hospital" section
4. Fill in hospital details:
   - Hospital Name: e.g., "City Hospital"
   - Hospital Address: e.g., "123 Main St"
   - Hospital ID: e.g., "city-001" (unique)
   - Password: e.g., "hospital123"
5. Click Save
6. Hospital is now in database and ready to use

### Workflow 2: Hospital Operations (Hospitalsite)

1. Open Hospital Portal: http://localhost:5174
2. Login with credentials from Step 1
3. Click to view dashboard
4. Use tabs to manage:
   - **Overview** - View current stats
   - **Beds** - Update available beds
   - **Medicine** - Add/manage medicines
   - **Blood** - Track blood bank
   - **Ambulances** - Manage ambulance fleet
5. Data saves automatically to database

### Workflow 3: Admin Monitoring (Main Dashboard)

1. Open Main Dashboard: http://localhost:5173
2. Login with admin@care.com / admin123
3. Go to "🏥 Hospitals" section
4. See all hospitals with:
   - Summary statistics
   - Real-time data
   - Clickable cards for details
5. Data refreshes every 5 seconds automatically

---

## 🔄 Real-time Data Flow

```
┌──────────────────────────────────────────────────────┐
│  HOSPITAL UPDATES DATA (Hospitalsite App)            │
│  Example: Update beds from 45 to 50                  │
└──────────────┬───────────────────────────────────────┘
               │ PATCH /api/hospitals/me
               ▼
┌──────────────────────────────────────────────────────┐
│  BACKEND (Express + MongoDB)                         │
│  Receives update, stores in database                 │
└──────────────┬───────────────────────────────────────┘
               │ MongoDB updated
               ▼
┌──────────────────────────────────────────────────────┐
│  ADMIN DASHBOARD (Every 5 seconds)                   │
│  Polls GET /api/hospitals                            │
│  Shows updated data: beds now 50                     │
└──────────────────────────────────────────────────────┘
```

---

## 🛠️ Detailed Setup Instructions

### Backend Setup

**Prerequisites:**
- Node.js installed
- MongoDB Atlas account (already configured)

**Installation:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'

# Install dependencies
npm install

# Create seed data
npm run seed

# This will output:
# Connected to MongoDB
# Created admin: admin@care.com
# JWT token: [long token]
```

**Start Development:**
```powershell
npm run dev
# Listens on http://localhost:5000
```

**Environment Variables (.env):**
```env
MONGODB_URI=mongodb+srv://arjun9654abc:Virtual%40123@cluster0.xkmsibl.mongodb.net/carelytics
JWT_SECRET=fcghjklvghjkhvggh
PORT=5000
```

### Admin App Setup

**Installation:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'
npm install
```

**Start Development:**
```powershell
npm run dev
# Listens on http://localhost:5173
```

**Features:**
- Admin login
- Create hospitals
- View hospital list

### Hospital Site Setup

**Installation:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'
npm install
```

**Start Development:**
```powershell
npm run dev
# Listens on http://localhost:5174
```

**Features:**
- Hospital login (using created credentials)
- Manage operational data
- Update beds, medicine, blood, ambulances

### Main Frontend Setup

**Installation:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\frontend'
npm install
```

**Start Development:**
```powershell
npm run dev
# Listens on http://localhost:5175
```

**Features:**
- View all hospitals (with real-time updates)
- Statistics and monitoring
- Hospital details expandable view
- Auto-refresh every 5 seconds

---

## 🔑 Credentials Reference

### Admin Account (All Admin Dashboards)
```
Email: admin@care.com
Password: admin123
```

### Sample Hospital (Create in Admin, login in Hospital Site)
```
Hospital Name: City Hospital
Hospital ID: city-001
Password: hospital123
```

---

## 🌐 API Endpoints Reference

### Admin Authentication
```
POST /api/admin/login
Body: { email, password }
Returns: { token, email, name }
```

### Hospital Management
```
POST /api/hospitals          (Create hospital - requires admin token)
GET /api/hospitals           (Get all hospitals - requires admin token)
POST /api/hospitals/login    (Hospital login)
GET /api/hospitals/me        (Get own details - requires hospital token)
PATCH /api/hospitals/me      (Update details - requires hospital token)
```

### Doctor Management
```
POST /api/doctors            (Create doctor)
GET /api/doctors             (Get doctors)
GET /api/doctors/:id         (Get specific doctor)
PATCH /api/doctors/:id       (Update doctor)
DELETE /api/doctors/:id      (Delete doctor)
```

### Patient Management
```
POST /api/patients           (Create patient)
GET /api/patients            (Get patients)
GET /api/patients/:id        (Get specific patient)
PATCH /api/patients/:id      (Update patient)
DELETE /api/patients/:id     (Delete patient)
```

---

## ✅ Verification Checklist

### Backend
- [ ] MongoDB connection successful
- [ ] Server running on port 5000
- [ ] Admin seed created
- [ ] No errors in console

### Admin Dashboard
- [ ] App loads at localhost:5173
- [ ] Can login with admin@care.com / admin123
- [ ] Can create hospital
- [ ] Hospital appears in database

### Hospital Site
- [ ] App loads at localhost:5174
- [ ] Can login with hospital credentials
- [ ] Can update operational data
- [ ] Data saved to database

### Main Dashboard
- [ ] App loads at localhost:5175
- [ ] Can login with admin credentials
- [ ] Hospitals list displays
- [ ] Data updates every 5 seconds

---

## 🐛 Troubleshooting

### Error: EADDRINUSE (Port already in use)

**Problem:** Port 5000, 5173, etc. already in use

**Solution:**
```powershell
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port
$env:PORT=5001
npm run dev
```

### Error: MongoDB Connection Failed

**Problem:** Can't connect to MongoDB Atlas

**Solution:**
1. Check internet connection
2. Verify MongoDB URI in backend/.env
3. Check MongoDB Atlas IP whitelist
4. Check credentials are correct

### Error: "Cannot GET /api/hospitals"

**Problem:** Backend not responding

**Solution:**
1. Start backend server first
2. Check backend console for errors
3. Verify VITE_API_BASE points to correct URL
4. Check network tab in browser

### Error: "Invalid Token" or "401 Unauthorized"

**Problem:** Authentication failed

**Solution:**
1. Clear localStorage: Open DevTools → Application → Clear All
2. Login again
3. Check backend JWT_SECRET in .env
4. Verify token is being sent in headers

### Error: CORS Error in Console

**Problem:** Frontend can't access backend

**Solution:**
1. Ensure backend CORS is enabled (it is)
2. Check VITE_API_BASE is correct
3. Verify backend is running
4. Check firewall settings

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  ADMIN DASHBOARD (React)                                │
│  - Login                                                │
│  - Create Hospitals                                     │
│  - View Hospital List                                   │
└──────────────┬──────────────────────────────────────────┘
               │ Admin Token
               ▼
┌─────────────────────────────────────────────────────────┐
│  BACKEND API (Express.js)                               │
│  - Admin Routes                                         │
│  - Hospital Routes                                      │
│  - Doctor Routes                                        │
│  - Patient Routes                                       │
└──────────────┬──────────────────────────────────────────┘
               │ CRUD Operations
               ▼
┌─────────────────────────────────────────────────────────┐
│  DATABASE (MongoDB Atlas)                               │
│  - Admin Collection                                     │
│  - Hospital Collection                                  │
│  - Doctor Collection                                    │
│  - Patient Collection                                   │
└─────────────────────────────────────────────────────────┘

Also:

┌─────────────────────────────────────────────────────────┐
│  HOSPITAL SITE (React)                                  │
│  - Hospital Login                                       │
│  - Manage Operations (Beds, Medicine, Blood, Ambulances)│
└──────────────┬──────────────────────────────────────────┘
               │ Hospital Token
               ▼
        Backend API (Same as above)
               │
               ▼
        Database (Same as above)

Also:

┌─────────────────────────────────────────────────────────┐
│  MAIN DASHBOARD (React)                                 │
│  - View All Hospitals (Real-time)                       │
│  - Statistics                                           │
│  - Auto-refresh every 5 seconds                         │
└──────────────┬──────────────────────────────────────────┘
               │ Admin Token
               ▼
        Backend API (Same as above)
```

---

## 🎯 Next Steps

### Immediate (Today)
1. Start all 4 servers
2. Create test hospital in Admin
3. Login to hospital site
4. Add operational data
5. View in main dashboard

### Short Term (This Week)
1. Customize UI colors/branding
2. Add more hospitals
3. Test real-time sync
4. Train staff

### Medium Term (This Month)
1. Deploy to production
2. Set up SSL certificate
3. Configure custom domain
4. Monitor system performance

### Long Term
1. Add doctor/patient management UI
2. Add analytics pages
3. Implement notifications
4. Add mobile app

---

## 📚 Documentation Files

In your CARELYTICS folder:

- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup
- `QUICK_COMMANDS.md` - Copy-paste commands
- `DATABASE_TEST_REPORT.md` - Database verification
- `ENV_FILES_GUIDE.md` - Environment configuration
- `HOSPITALSITE_FEATURES.md` - Hospital portal features
- `COMPLETE_SYSTEM_OVERVIEW.md` - Full architecture
- `COMPLETION_SUMMARY.md` - Project status
- `FRONTEND_GUIDE.md` - Frontend documentation
- `STARTUP_GUIDE.md` - This file

---

## 🎉 Ready to Go!

Everything is set up and ready to use. Just follow the Quick Start steps above and you'll have your complete hospital management system running!

### Quick Start Commands (Copy & Paste)

**Terminal 1:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'; npm run dev
```

**Terminal 2:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'; npm run dev
```

**Terminal 3:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'; npm run dev
```

**Terminal 4:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\frontend'; npm run dev
```

Then open:
- Admin: http://localhost:5173
- Hospital: http://localhost:5174
- Dashboard: http://localhost:5175

---

**Happy Managing! 🏥**

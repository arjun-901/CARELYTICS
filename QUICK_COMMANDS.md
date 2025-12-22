# CARELYTICS - Quick Copy & Paste Commands

Use these commands directly - no editing needed!

---

## 🚀 OPTION 1: Start Everything (Recommended)

### Terminal 1 - Backend
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'; npm run dev
```

Wait for "Server listening on port 5000", then open new terminal.

### Terminal 2 - Admin Dashboard
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'; $env:VITE_API_BASE='http://localhost:5000/api'; npm run dev
```

Wait for "Local: http://localhost:5173", then open new terminal.

### Terminal 3 - Hospital Dashboard
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'; $env:VITE_API_BASE='http://localhost:5000/api'; npm run dev
```

Wait for "Local: http://localhost:5174"

### Now Open in Browser
- Admin: `http://localhost:5173`
- Hospital: `http://localhost:5174`

---

## 🧪 OPTION 2: Quick Test Flow

### Step 1: Seed Database
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'; npm run seed
```

✅ You should see: "Created admin: admin@care.com"

### Step 2: Start Backend
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'; npm run dev
```

✅ You should see: "Server listening on port 5000"

### Step 3: Start Admin
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'; $env:VITE_API_BASE='http://localhost:5000/api'; npm run dev
```

✅ Opens at http://localhost:5173

### Step 4: Test Admin Login
- Email: `admin@care.com`
- Password: `admin123`
- Click "Login"

✅ Should see: "Welcome, admin@care.com"

### Step 5: Create Test Hospital
- Hospital Name: `Test Hospital`
- Address: `123 Test Street`
- Hospital ID: `test001`
- Password: `test123`
- Click "Save Hospital"

✅ Should see hospital in list with ID and password

### Step 6: Start Hospitalsite
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'; $env:VITE_API_BASE='http://localhost:5000/api'; npm run dev
```

✅ Opens at http://localhost:5174

### Step 7: Test Hospital Login
- Hospital ID: `test001`
- Password: `test123`
- Click "Login"

✅ Should see: Hospital name and address displayed

### Step 8: Add Hospital Data
1. Go to "Beds" tab
   - Total: 100
   - Available: 50
   - Click "Save"

2. Go to "Medicine" tab
   - Name: Paracetamol
   - Qty: 500
   - Click "Add Medicine"

3. Go to "Blood" tab
   - Type: O+
   - Units: 50
   - Click "Update Stock"

4. Go to "Ambulances" tab
   - Total: 5
   - Available: 3
   - Click "Save"

✅ All data saves to MongoDB

### Step 9: Real-time Sync Test
1. Open hospital dashboard in 2 browser tabs
2. Change data in Tab A
3. Watch Tab B update within 5 seconds

✅ Real-time synchronization working!

---

## 🔧 OPTION 3: Individual Component Testing

### Test Backend Only
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm install
npm run seed
npm run dev
```

Test with curl:
```powershell
# Test admin login
curl -X POST http://localhost:5000/api/admin/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@care.com","password":"admin123"}'
```

### Test Admin App Only
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'
npm install
$env:VITE_API_BASE='http://localhost:5000/api'
npm run dev
```

### Test Hospital App Only
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'
npm install
$env:VITE_API_BASE='http://localhost:5000/api'
npm run dev
```

---

## 📋 OPTION 4: Check Configuration

### Verify Backend .env
```powershell
cat 'C:\Users\Anand\Desktop\CARELYTICS\backend\.env'
```

Expected output:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=fcghjklvghjkhvggh
SEED_ADMIN_EMAIL=admin@care.com
SEED_ADMIN_PASSWORD=admin123
PORT=5000
```

### Verify Admin .env
```powershell
cat 'C:\Users\Anand\Desktop\CARELYTICS\Admin\.env'
```

Expected output:
```
VITE_API_BASE=http://localhost:5000/api
```

### Verify Hospitalsite .env
```powershell
cat 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite\.env'
```

Expected output:
```
VITE_API_BASE=http://localhost:5000/api
```

---

## 🛠️ OPTION 5: Troubleshooting Commands

### Check if Backend is Running
```powershell
curl http://localhost:5000
```

Expected: JSON response with "ok: true"

### Check if Port 5000 is in Use
```powershell
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
```

### Kill Process on Port 5000
```powershell
$process = Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $process -Force
```

### Clear Database and Reset
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm run seed
```

This recreates the default admin.

### Check npm is Installed
```powershell
npm --version
node --version
```

### Reinstall Dependencies
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
rm node_modules -Force -Recurse
rm package-lock.json
npm install
npm run dev
```

---

## 📱 OPTION 6: Access from Other Machines

### From another computer on same network:

Get your PC IP:
```powershell
ipconfig
# Look for "IPv4 Address" under your network connection
# Example: 192.168.1.100
```

Then access from other machine:
- Admin: `http://192.168.1.100:5173`
- Hospital: `http://192.168.1.100:5174`
- API: `http://192.168.1.100:5000/api`

Or update .env files to use your IP:
```powershell
# In Admin/.env
VITE_API_BASE=http://192.168.1.100:5000/api

# In Hospitalsite/.env
VITE_API_BASE=http://192.168.1.100:5000/api
```

---

## 🚀 OPTION 7: Production Deployment

### Build Frontend for Production

#### Build Admin App
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'
npm run build
```

Output in: `Admin/dist/`

#### Build Hospitalsite
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'
npm run build
```

Output in: `Hospitalsite/dist/`

### Deploy Backend
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm run start
# (or use: npm run dev for development)
```

---

## 🎯 OPTION 8: Clean Start (If Something Breaks)

### Complete Reset
```powershell
# 1. Backend
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
rm node_modules -Force -Recurse
npm install
npm run seed
npm run dev

# Open new terminal

# 2. Admin
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'
rm node_modules -Force -Recurse
npm install
$env:VITE_API_BASE='http://localhost:5000/api'
npm run dev

# Open new terminal

# 3. Hospital
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'
rm node_modules -Force -Recurse
npm install
$env:VITE_API_BASE='http://localhost:5000/api'
npm run dev
```

---

## 📊 OPTION 9: View Database Collections

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/try/download/compass
2. Connect with: `mongodb+srv://arjun9654abc:Virtual%40123@cluster0.xkmsibl.mongodb.net`
3. Browse collections: admins, hospitals, doctors, patients

### Using MongoDB Shell
```powershell
# Connect to MongoDB (requires mongosh installed)
mongosh "mongodb+srv://arjun9654abc:Virtual%40123@cluster0.xkmsibl.mongodb.net/carelytics"

# Commands in shell:
# show collections
# db.hospitals.find()
# db.admins.find()
# db.hospitals.find({ hospitalId: "test001" })
```

---

## 🔄 OPTION 10: Continuous Development

### Auto-reload on file changes
Both npm run dev commands automatically restart on changes.

### Hot Module Replacement (HMR)
Frontend apps hot-reload on code changes without full refresh.

### Backend Auto-reload
Install nodemon globally (already in package.json):
```powershell
npm install -g nodemon
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
nodemon server.js
```

---

## ⏱️ Expected Startup Times

| Component | Time | Status |
|-----------|------|--------|
| Backend | 2-3 sec | "Server listening on port 5000" |
| Admin App | 5-10 sec | "Local: http://localhost:5173" |
| Hospital App | 5-10 sec | "Local: http://localhost:5174" |
| Database | < 1 sec | Automatic |

---

## 🎓 Learning Path

### Day 1: Setup
- [ ] Start all 3 servers
- [ ] Access both apps
- [ ] Login to admin and hospital

### Day 2: Testing
- [ ] Create multiple hospitals
- [ ] Test each hospital page
- [ ] Verify data persistence
- [ ] Test real-time sync

### Day 3: Understanding Code
- [ ] Review backend routes
- [ ] Check database collections
- [ ] Understand React components
- [ ] Learn authentication flow

### Day 4: Customization
- [ ] Modify UI/styling
- [ ] Add new fields
- [ ] Extend functionality
- [ ] Deploy to production

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ `npm run dev` shows "Server listening on port 5000"
2. ✅ Admin app opens at http://localhost:5173
3. ✅ Hospital app opens at http://localhost:5174
4. ✅ Can login with admin@care.com / admin123
5. ✅ Can create a hospital
6. ✅ Can login with hospital ID/password
7. ✅ Hospital data saves and persists
8. ✅ Real-time sync works (refresh shows same data)

---

## 🎉 All Set!

Everything is configured and ready to use.

Just copy-paste the commands above and enjoy!

---

**Need help?** Check the detailed documentation:
- `COMPLETE_SYSTEM_OVERVIEW.md` - Full system details
- `SETUP_GUIDE.md` - Detailed setup instructions
- `DATABASE_TEST_REPORT.md` - Database testing guide
- `HOSPITALSITE_FEATURES.md` - Feature documentation


# CARELYTICS - Complete Setup & Testing Guide

## Prerequisites
- Node.js (v16+) installed
- MongoDB Atlas account (or local MongoDB)
- PowerShell terminal

## Project Structure

```
CARELYTICS/
├── backend/          # Express + MongoDB API
├── Admin/            # Admin dashboard (create hospitals)
├── Hospitalsite/     # Hospital dashboard (manage operations)
└── frontend/         # Main admin frontend (optional)
```

## 1. Backend Setup

### Step 1: Configure Backend Environment

Your `.env` file is already configured in `backend/.env`:
```
MONGODB_URI=mongodb+srv://arjun9654abc:Virtual%40123@cluster0.xkmsibl.mongodb.net/carelytics
JWT_SECRET=fcghjklvghjkhvggh
SEED_ADMIN_EMAIL=admin@care.com
SEED_ADMIN_PASSWORD=admin123
SEED_ADMIN_NAME=Admin
PORT=5000
```

**Note:** The MongoDB connection uses Atlas. Make sure the cluster allows connections from your IP.

### Step 2: Install Backend Dependencies & Test

```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'

# Install dependencies
npm install

# Seed the default admin (creates admin@care.com / admin123)
npm run seed

# You should see output like:
# Connected to MongoDB for seeding
# Created admin: admin@care.com
# Admin login token (store securely):
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# Use this token as: Authorization: Bearer <token>

# Start backend server
npm run dev
# Should output: Server listening on port 5000
```

Keep this terminal running.

## 2. Admin App Setup (Create Hospitals)

Open a new PowerShell terminal:

```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'

# Install dependencies
npm install

# Start dev server with API connection
$env:VITE_API_BASE='http://localhost:5000/api'; npm run dev
# Should output: VITE v7.2.4... Local: http://localhost:5173/
```

### Testing Admin App:
1. Open browser to `http://localhost:5173`
2. Login with:
   - Email: `admin@care.com`
   - Password: `admin123`
3. Create a test hospital:
   - Name: `City Hospital`
   - Address: `123 Main St, Downtown`
   - Hospital ID: `hosp001`
   - Password: `hospital123`
4. Click "Save Hospital"
5. Verify the hospital appears in the "Saved Hospitals" list

## 3. Hospitalsite App Setup (Hospital Dashboard)

Open a new PowerShell terminal:

```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'

# Install dependencies (if not already done)
npm install

# Start dev server with API connection
$env:VITE_API_BASE='http://localhost:5000/api'; npm run dev
# Should output: VITE v7.2.4... Local: http://localhost:5174/
```

### Testing Hospitalsite App:
1. Open browser to `http://localhost:5174`
2. Login with the hospital credentials you created:
   - Hospital ID: `hosp001`
   - Password: `hospital123`
3. You should see the hospital dashboard with:
   - Hospital name and address
   - Overview tab with stats
   - Tabs for: Beds, Medicine, Blood, Ambulances
4. Click each tab and add some test data:
   - **Beds:** Total: 100, Available: 50
   - **Medicine:** Add "Paracetamol" (50 units), "Aspirin" (100 units)
   - **Blood:** Add O+ (20 units), B- (15 units)
   - **Ambulances:** Total: 5, Available: 3
5. Click "Refresh" to verify data persists
6. Open another browser tab (still on Hospitalsite) and you should see updates in real-time (polls every 5 seconds)

## Environment Files

### Backend - `.env`
```
MONGODB_URI=mongodb+srv://arjun9654abc:Virtual%40123@cluster0.xkmsibl.mongodb.net/carelytics
JWT_SECRET=fcghjklvghjkhvggh
SEED_ADMIN_EMAIL=admin@care.com
SEED_ADMIN_PASSWORD=admin123
SEED_ADMIN_NAME=Admin
PORT=5000
```

### Admin App - `.env`
```
VITE_API_BASE=http://localhost:5000/api
```

### Hospitalsite App - `.env`
```
VITE_API_BASE=http://localhost:5000/api
```

## Database Collections

The system creates these MongoDB collections:

1. **admins** - Admin users
2. **hospitals** - Hospital records with operational data
3. **doctors** - Hospital staff (ready for integration)
4. **patients** - Patient records (ready for integration)

### Hospital Document Structure
```json
{
  "_id": "ObjectId",
  "name": "City Hospital",
  "address": "123 Main St",
  "hospitalId": "hosp001",
  "password": "bcrypt_hashed_password",
  "initialPassword": "hospital123",
  "beds": { "total": 100, "available": 50 },
  "medicineStock": [
    { "name": "Paracetamol", "quantity": 50 }
  ],
  "bloodUnits": { "O+": 20, "B-": 15 },
  "ambulances": { "total": 5, "available": 3 },
  "createdBy": "ObjectId",
  "createdAt": "2025-12-06T...",
  "updatedAt": "2025-12-06T..."
}
```

## API Endpoints

### Admin Routes
- `POST /api/admin/login` - Login as admin
- `POST /api/hospitals` - Create hospital (protected)
- `GET /api/hospitals` - List hospitals (protected)

### Hospital Routes (Hospital Login)
- `POST /api/hospitals/login` - Hospital login
- `GET /api/hospitals/me` - Get hospital details (protected)
- `PATCH /api/hospitals/me` - Update hospital data (protected)

### Doctor Routes (prepared for future use)
- `POST /api/doctors` - Create doctor
- `GET /api/doctors` - List doctors
- `PATCH /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Patient Routes (prepared for future use)
- `POST /api/patients` - Create patient
- `GET /api/patients` - List patients
- `PATCH /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

## Troubleshooting

### Backend won't start
1. Check MongoDB URI is correct
2. Ensure MongoDB Atlas cluster allows your IP
3. Check port 5000 is not in use: `netstat -ano | findstr :5000`

### Admin app can't login
1. Verify backend is running (check `http://localhost:5000/`)
2. Check VITE_API_BASE is set: `$env:VITE_API_BASE`
3. Ensure admin was seeded: `npm run seed` in backend folder

### Hospital can't login after creation
1. Check hospital was created in Admin app
2. Verify you're using correct Hospital ID and password
3. Check backend logs for errors

### Data not persisting
1. Check MongoDB connection is active
2. Look at browser console for API errors
3. Check backend logs for database errors

## Quick Commands Reference

```powershell
# Terminal 1: Backend
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm run dev

# Terminal 2: Admin App
cd 'C:\Users\Anand\Desktop\CARELYTICS\Admin'
$env:VITE_API_BASE='http://localhost:5000/api'; npm run dev

# Terminal 3: Hospitalsite App
cd 'C:\Users\Anand\Desktop\CARELYTICS\Hospitalsite'
$env:VITE_API_BASE='http://localhost:5000/api'; npm run dev

# Testing APIs with curl (optional)
# Login as admin
curl -X POST http://localhost:5000/api/admin/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@care.com","password":"admin123"}'

# Login as hospital
curl -X POST http://localhost:5000/api/hospitals/login `
  -H "Content-Type: application/json" `
  -d '{"hospitalId":"hosp001","password":"hospital123"}'
```

## Next Steps

1. ✅ Backend running with MongoDB
2. ✅ Admin can create hospitals
3. ✅ Hospitals can login and manage data
4. 📋 (Optional) Add doctor and patient management
5. 📋 (Optional) Add analytics and reports
6. 📋 (Optional) Deploy to production


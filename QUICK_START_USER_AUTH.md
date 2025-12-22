# ⚡ QUICK REFERENCE - USER AUTHENTICATION

## 🚀 Start Here (3 Steps)

### Step 1: Start Backend
```powershell
cd C:\Users\Anand\Desktop\CARELYTICS\backend
npm run dev
```
✅ Server runs on http://localhost:5000

### Step 2: Start Frontend
```powershell
cd C:\Users\Anand\Desktop\CARELYTICS\frontend
npm run dev
```
✅ App runs on http://localhost:5175

### Step 3: Open Browser
```
http://localhost:5175
```
✅ See login/signup page

---

## 📋 What You Can Do Now

### 1. Create New Account (Signup)
```
Click "Sign up here"
  ↓
Enter:
  Name: John Doe
  Email: john@example.com
  Password: password123
  Confirm: password123
  ↓
Click "Sign Up"
  ↓
Logged in automatically
```

### 2. Login With Existing Account
```
Enter email and password
  ↓
Click "Login"
  ↓
Logged in
```

### 3. View Hospitals (After Login)
```
Logged in → Click "Hospitals"
  ↓
See all hospitals with:
  • Name, Location
  • Beds, Ambulances
  • Medicine, Blood Units
  • Doctors, Patients
  ↓
Updates every 5 seconds (real-time)
```

### 4. Logout
```
Click profile (top right)
  ↓
Click "Logout"
  ↓
Back to login page
```

---

## 🔑 Key Endpoints

### User Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/users/signup | POST | Create account |
| /api/users/login | POST | Login |
| /api/users/me | GET | Get profile |
| /api/users/update | PATCH | Update profile |

### Hospital Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/hospitals | GET | Get all hospitals |
| /api/hospitals/:id | GET | Get hospital details |

---

## 💾 What Gets Stored

### In Database (MongoDB)
```
User Collection:
  - name
  - email
  - password (hashed)
  - phone
  - address
  - role
  - isActive
  - createdAt
  - updatedAt
```

### In Browser (localStorage)
```
user_token  → JWT token
user_email  → Email address
user_name   → User name
user_id     → User ID
```

---

## 🔐 Security Details

- ✅ Password: Bcrypt hashed (never plain text)
- ✅ Token: JWT (7-day expiration)
- ✅ Email: Must be unique
- ✅ Password: Min 6 characters
- ✅ Confirmation: Must match password

---

## 🧪 Test Accounts

### Self-Created (Signup)
```
Email: test@example.com
Password: test123
```

### Create More
- Click "Sign up here"
- Use different email
- Create as many as needed

---

## 📂 Important Files

### Backend
```
models/User.js           → User schema
routes/users.js          → Login/signup endpoints
server.js               → Server (includes user routes)
```

### Frontend
```
pages/UserAuth.jsx      → Login/signup page
App.jsx                 → App with auth
services/api.js         → API functions
components/Navbar.jsx   → User profile
```

---

## 🆚 What Changed

### Before (Admin)
```
❌ AdminLogin.jsx
❌ admin@care.com login
❌ Admin-only dashboard
```

### Now (User)
```
✅ UserAuth.jsx (signup + login)
✅ User registration
✅ User login with own credentials
✅ All users see hospital dashboard
```

---

## ✅ Verification Checklist

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 5175)
- [ ] Can see login/signup page
- [ ] Can create new account
- [ ] Can login with account
- [ ] Can see hospital list
- [ ] Can logout
- [ ] User name appears in navbar
- [ ] Token in localStorage
- [ ] User in database

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to server" | Start backend with npm run dev |
| "Page not loading" | Start frontend with npm run dev |
| "User already exists" | Use different email |
| "Invalid password" | Check email and password match |
| "Auto-login not working" | Clear localStorage, login again |
| "Logout not working" | Refresh page, should see login |

---

## 📞 Need Help?

### Check These Files
1. `USER_AUTH_GUIDE.md` - Complete documentation
2. `USER_AUTH_TESTING.md` - Testing scenarios
3. `USER_AUTHENTICATION_COMPLETE.md` - Full overview
4. `FRONTEND_GUIDE.md` - Frontend details

### Check Backend
```powershell
# Backend console should show:
Connected to MongoDB
Server listening on port 5000
```

### Check Frontend
```
Console (F12) should have no red errors
Network tab should show successful API calls
```

---

## 🎯 Common Tasks

### Create Test User
1. Open http://localhost:5175
2. Click "Sign up here"
3. Fill form
4. Click "Sign Up"

### Check Database
```powershell
# Connect to MongoDB
mongosh
use carelytics
db.users.find()
```

### Clear Session
1. Open DevTools (F12)
2. Application → LocalStorage
3. Delete all user_* keys
4. Refresh page → login page appears

### View API Calls
1. Open DevTools (F12)
2. Network tab
3. Perform login
4. See POST to /api/users/login
5. Check response body for token

---

## 📊 User Information Fields

```
Required:
  ✓ Name
  ✓ Email (must be unique)
  ✓ Password (min 6 characters)

Optional:
  • Phone
  • Address
  • Role (default: "user")
```

---

## 🔄 Auth Flow Diagram

```
User Opens App
     ↓
Check localStorage
     ↓
Token exists?
  ├─ YES → Auto-login → Show Dashboard
  └─ NO → Show Login/Signup Page
     ↓
New User? → Signup
Existing User? → Login
     ↓
Send credentials
     ↓
Backend validates
     ↓
Generate token
     ↓
Store in localStorage
     ↓
Show Dashboard
```

---

## 🚨 Important Notes

⚠️ **Password Security**
- Never share passwords
- Minimum 6 characters
- Should be complex for real use

⚠️ **Token Security**
- Token stored in localStorage
- Valid for 7 days
- Expires after logout
- Don't share token

⚠️ **Email Uniqueness**
- Each account needs unique email
- Can't register twice with same email
- Case-insensitive (john@x.com = JOHN@X.COM)

---

## 🎉 Ready to Go!

Everything is set up and working:

✅ Backend with user authentication
✅ Frontend with login/signup
✅ MongoDB database
✅ Hospital dashboard
✅ Real-time updates

### Start Now:
1. Run backend: `npm run dev`
2. Run frontend: `npm run dev`
3. Open http://localhost:5175
4. Sign up with email
5. View hospitals in real-time

---

## 📝 Quick Command Reference

```powershell
# Start Backend
cd backend; npm run dev

# Start Frontend
cd frontend; npm run dev

# Start Both (in separate terminals)
# Terminal 1
cd C:\Users\Anand\Desktop\CARELYTICS\backend; npm run dev

# Terminal 2
cd C:\Users\Anand\Desktop\CARELYTICS\frontend; npm run dev

# Then open
http://localhost:5175
```

---

**Everything is ready! Happy coding! 🚀**

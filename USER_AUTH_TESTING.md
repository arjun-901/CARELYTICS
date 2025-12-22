# 🧪 USER AUTHENTICATION - QUICK TESTING GUIDE

## ✅ Verification Checklist

Before you start testing, make sure:

- [ ] Backend running: `npm run dev` (in backend folder)
- [ ] Frontend running: `npm run dev` (in frontend folder)
- [ ] MongoDB connected
- [ ] Port 5000 (backend) and 5175 (frontend) accessible

---

## 🎯 Quick Test Scenarios

### Test 1: New User Signup ✅

**Objective:** Create a new user account

**Steps:**
1. Open http://localhost:5175
2. You should see login page (with "Sign up here" link)
3. Click "Sign up here" at bottom
4. Fill in form:
   ```
   Name:              John Doe
   Email:             john@example.com
   Password:          password123
   Confirm Password:  password123
   Phone:             555-123-4567 (optional)
   Address:           123 Main St (optional)
   ```
5. Click "Sign Up" button
6. Should show: "Account created successfully! Redirecting..."
7. Should redirect to dashboard
8. Sidebar and navbar should show

**Expected Result:** ✅
- User created in database
- Token stored in localStorage
- Dashboard displayed
- User name appears in navbar

**Check Database:**
```powershell
# Connect to MongoDB
# Check users collection
db.users.find().pretty()

# Should see:
{
  "_id": ObjectId(...),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password_here",
  "phone": "555-123-4567",
  "address": "123 Main St",
  "role": "user",
  "isActive": true,
  "createdAt": ISODate(...),
  "updatedAt": ISODate(...)
}
```

---

### Test 2: Existing User Login ✅

**Objective:** Login with credentials from Test 1

**Steps:**
1. Refresh page (or logout if already logged in)
2. You should see login page
3. Fill in:
   ```
   Email:    john@example.com
   Password: password123
   ```
4. Click "Login" button
5. Should show: "Login successful! Redirecting..."
6. Should redirect to dashboard

**Expected Result:** ✅
- User logged in
- Token stored
- Dashboard displayed
- User info in navbar

---

### Test 3: Auto-Login on Page Refresh ✅

**Objective:** Verify session persistence

**Steps:**
1. Stay logged in from Test 2
2. Press F5 to refresh page
3. Should NOT show login page
4. Should immediately show dashboard
5. User name should appear in navbar

**Expected Result:** ✅
- Auto-login working
- No manual login needed
- Session preserved

---

### Test 4: Invalid Email/Password ❌

**Objective:** Test error handling

**Steps:**
1. Logout (click profile → Logout)
2. Try login with:
   ```
   Email:    john@example.com
   Password: wrongpassword
   ```
3. Click "Login"
4. Should show error: "Invalid email or password"

**Expected Result:** ✅
- Error message displayed
- Stay on login page
- No token generated

---

### Test 5: Password Mismatch (Signup) ❌

**Objective:** Test signup validation

**Steps:**
1. Click "Sign up here"
2. Fill form with:
   ```
   Name:              Jane Doe
   Email:             jane@example.com
   Password:          password123
   Confirm Password:  password456
   ```
3. Click "Sign Up"
4. Should show error: "Passwords do not match"

**Expected Result:** ✅
- Error displayed
- Stay on signup page
- No user created

---

### Test 6: Password Too Short ❌

**Objective:** Test password length validation

**Steps:**
1. On signup form
2. Fill with:
   ```
   Name:              Bob Smith
   Email:             bob@example.com
   Password:          123
   Confirm Password:  123
   ```
3. Click "Sign Up"
4. Should show error: "Password must be at least 6 characters"

**Expected Result:** ✅
- Error displayed
- Signup blocked

---

### Test 7: Duplicate Email ❌

**Objective:** Test email uniqueness

**Steps:**
1. Click "Sign up here"
2. Try to register with email from Test 1:
   ```
   Email: john@example.com (already used)
   ```
3. Click "Sign Up"
4. Should show error: "User already exists with this email"

**Expected Result:** ✅
- Error message shown
- Can't create duplicate account

---

### Test 8: Logout Functionality ✅

**Objective:** Test logout clears session

**Steps:**
1. Make sure you're logged in
2. Click profile picture (top right)
3. A dropdown should appear
4. Click "Logout" button
5. Should redirect to login page
6. All form fields should be empty

**Check localStorage:**
1. Open DevTools (F12)
2. Go to Application → Storage → LocalStorage
3. Check keys starting with "user_":
   - BEFORE logout: `user_token`, `user_email`, `user_name`, `user_id` exist
   - AFTER logout: All `user_*` keys should be gone

**Expected Result:** ✅
- Logged out
- Redirected to login
- localStorage cleared
- Session ended

---

### Test 9: View All Hospitals (As User) ✅

**Objective:** Verify user can view hospital list

**Steps:**
1. Login as user
2. Click "🏥 Hospitals" in sidebar
3. Should load hospital list
4. Cards should display hospital data
5. Data should update every 5 seconds

**Expected Result:** ✅
- Hospital list displays
- No "admin only" errors
- User token used for API calls
- Real-time updates working

---

### Test 10: Multiple Users ✅

**Objective:** Test multiple user accounts

**Steps:**
1. Create User 1:
   ```
   Email: user1@example.com
   Password: pass123
   ```
2. Logout
3. Create User 2:
   ```
   Email: user2@example.com
   Password: pass456
   ```
4. Logout
5. Login as User 1 with user1@example.com / pass123
6. Logout
7. Login as User 2 with user2@example.com / pass456

**Expected Result:** ✅
- Each user can create account
- Each user can login with own credentials
- Switching between users works
- Each sees correct profile info

---

## 🔍 Debugging Tips

### Check API Calls

1. Open DevTools (F12)
2. Go to Network tab
3. Perform login/signup
4. Look for requests to `/api/users/login` and `/api/users/signup`
5. Check response body for token

### Check LocalStorage

1. Open DevTools (F12)
2. Go to Application → LocalStorage
3. Look for keys:
   - `user_token`
   - `user_email`
   - `user_name`
   - `user_id`
4. Token should be long JWT string

### Check Console Errors

1. Open DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Check error messages
5. Search for "401", "400", "500" errors

### Check Database

```powershell
# Connect to MongoDB
mongosh

# Use carelytics database
use carelytics

# Check users collection
db.users.find().pretty()

# Count users
db.users.countDocuments()

# Find specific user
db.users.findOne({ email: "john@example.com" })

# Check password is hashed
db.users.findOne({ email: "john@example.com" }).password
# Should be long hashed string, not plain text
```

---

## ⚡ Performance Checks

### Expected Performance

| Action | Expected Time | Status |
|--------|---------------|--------|
| Load login page | < 1 sec | ✅ |
| Signup | < 2 sec | ✅ |
| Login | < 1 sec | ✅ |
| Auto-login | < 500ms | ✅ |
| Load dashboard | < 2 sec | ✅ |
| Logout | < 500ms | ✅ |

### Check Speed

1. Open DevTools → Performance tab
2. Click Record
3. Perform action (login, signup, etc.)
4. Click Stop
5. Check timings
6. Should be within expected times

---

## 📊 Test Results Template

**Test Date:** __________
**Tester:** __________
**Environment:** Backend: 5000 | Frontend: 5175

| Test # | Scenario | Result | Notes |
|--------|----------|--------|-------|
| 1 | New user signup | ✅/❌ | |
| 2 | Existing user login | ✅/❌ | |
| 3 | Auto-login on refresh | ✅/❌ | |
| 4 | Invalid password | ✅/❌ | |
| 5 | Password mismatch | ✅/❌ | |
| 6 | Short password | ✅/❌ | |
| 7 | Duplicate email | ✅/❌ | |
| 8 | Logout | ✅/❌ | |
| 9 | View hospitals | ✅/❌ | |
| 10 | Multiple users | ✅/❌ | |

---

## 🚀 Ready to Test!

Everything is set up. Start testing with these scenarios above!

### Quick Commands

**Start Backend:**
```powershell
cd C:\Users\Anand\Desktop\CARELYTICS\backend
npm run dev
```

**Start Frontend:**
```powershell
cd C:\Users\Anand\Desktop\CARELYTICS\frontend
npm run dev
```

**Open in Browser:**
```
http://localhost:5175
```

---

**Happy Testing! 🎉**

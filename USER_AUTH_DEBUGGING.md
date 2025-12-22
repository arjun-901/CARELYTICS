# 🔍 User Authentication Debugging Guide

## Error: "Signup failed. Please try again."

This guide helps you troubleshoot and fix the signup/login issue.

---

## Step 1: Check Backend Connection

### Test Backend is Running
```powershell
# Terminal 1
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm run dev
```

**Expected Output:**
```
Connected to MongoDB
Server listening on port 5000
```

### Test API Endpoint Directly

Open your browser and go to:
```
http://localhost:5000/
```

Should see:
```json
{"ok":true,"message":"Carelytics backend running"}
```

---

## Step 2: Check MongoDB Connection

Run seed script to verify database:
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm run seed
```

**Expected Output:**
```
Connected to MongoDB for seeding
Created admin: admin@care.com
Admin login token: [token]
```

If this fails:
1. Check internet connection
2. Verify MongoDB URI in backend/.env
3. Check credentials are correct

---

## Step 3: Test Signup API with Postman/cURL

### Using Browser DevTools (Easiest)

1. Open http://localhost:5175
2. Open DevTools (F12)
3. Go to "Network" tab
4. Try signup with test data:
   - Name: Test User
   - Email: testuser@test.com
   - Password: test123456
   - Phone: 1234567890
   - Address: Test Address

5. Look for POST request to `/api/users/signup`
6. Click on it and check:
   - **Request Tab**: See what data is being sent
   - **Response Tab**: See what error is returned

### If Request Fails

Check the Response section for error message. Common errors:

**"Please provide name, email, and password"**
→ Frontend not sending all fields. Check form validation.

**"User already exists with this email"**
→ Email is already registered. Use different email.

**"Cannot POST /api/users/signup"**
→ Backend routes not mounted. Restart backend.

**500 Error or timeout**
→ Backend crashed or unreachable. Restart backend.

---

## Step 4: Frontend Console Errors

### Check Browser Console (F12)

1. Open http://localhost:5175
2. Press F12 to open DevTools
3. Go to "Console" tab
4. Try signup
5. Look for red error messages

**Common Console Errors:**

**"API_BASE is undefined"**
→ .env file not set. Create frontend/.env:
```
VITE_API_BASE=http://localhost:5000
```

**"Cannot read property 'data' of undefined"**
→ Response format issue. Check API is working correctly.

**"POST request blocked by CORS"**
→ Backend CORS not enabled. Check server.js has `app.use(cors())`.

---

## Step 5: Check Frontend Configuration

### Verify frontend/.env

File: `c:\Users\Anand\Desktop\CARELYTICS\frontend\.env`

Content should be:
```env
VITE_API_BASE=http://localhost:5000
```

If file is empty or missing:
```powershell
# Create/Update the file
echo "VITE_API_BASE=http://localhost:5000" > frontend/.env
```

### Verify API Service

File: `frontend/src/services/api.js`

Check line 1-5:
```javascript
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
export const axiosInstance = axios.create({
  baseURL: API_BASE + "/api",
});
```

---

## Step 6: Complete Verification Workflow

### 1. Terminal 1 - Start Backend
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm install
npm run dev
```

Wait for: `Server listening on port 5000`

### 2. Terminal 2 - Start Frontend
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\frontend'
npm install
npm run dev
```

Wait for: `Local: http://localhost:5175`

### 3. Open Browser
```
http://localhost:5175
```

### 4. Check Console (F12 → Console)
- No red errors
- See "Ready" message

### 5. Try Signup
- Click "Create Account" tab
- Fill form:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Password: `password123`
  - Confirm: `password123`
  - Phone: `9999999999`
  - Address: `123 Main St`
- Click Signup button

### 6. Check Network Tab (F12 → Network)
- See POST to `/api/users/signup`
- Status should be 201 (Created)
- Response should have `"success": true`

---

## Detailed Troubleshooting by Symptom

### Symptom: Signup button does nothing

**Cause 1:** JavaScript error in console
→ Check browser console for red errors
→ Fix them

**Cause 2:** Form validation fails silently
→ Fill ALL fields correctly
→ Check console for validation error message

**Cause 3:** API endpoint not working
→ Check backend is running
→ Check network tab for failed request
→ Check backend console for errors

---

### Symptom: "Signup failed. Please try again"

**Cause 1:** Network request failed
→ Check backend is running on port 5000
→ Check VITE_API_BASE in frontend/.env
→ Restart both frontend and backend

**Cause 2:** Database error
→ Check MongoDB connection
→ Run `npm run seed` to verify
→ Check backend console for error details

**Cause 3:** Response format issue
→ Check backend returns correct JSON
→ Verify response has `success: true`
→ Check `user` object has required fields

---

### Symptom: "User already exists with this email"

**Solution:** Use a different email address
→ Email is already registered
→ Check MongoDB to see existing users

```powershell
# Connect to MongoDB and check users
# (requires MongoDB tools installed)
```

Or just use a different email like:
- john1@test.com
- test123@example.com
- user2024@demo.com

---

### Symptom: 500 Error from Backend

**Cause:** Backend crashed or error in route handler

**Solution:**
1. Check backend console for error message
2. Verify User model is created correctly
3. Check password is being hashed
4. Verify JWT_SECRET is set in .env

```powershell
# Restart backend
cd backend
npm run dev
```

---

## Quick Fix Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5175
- [ ] MongoDB connected (test with npm run seed)
- [ ] frontend/.env has VITE_API_BASE=http://localhost:5000
- [ ] No red errors in browser console
- [ ] Network tab shows POST to /api/users/signup
- [ ] Response status is 201 or 200
- [ ] Response has "success": true
- [ ] Email not already registered

---

## Testing Credentials

### For Testing Signup
```
Name: Test User
Email: test@example.com
Password: test123456
Phone: 9876543210
Address: Test Street
```

### For Testing Login
Use any email you just signed up with and correct password

---

## Command Reference

### Start All Services

**Terminal 1:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'; npm run dev
```

**Terminal 2:**
```powershell
cd 'C:\Users\Anand\Desktop\CARELYTICS\frontend'; npm run dev
```

### Database Operations

```powershell
# Test seed (creates admin)
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
npm run seed

# Verify MongoDB connection
npm run dev
```

### Reset Everything

```powershell
# Clear node_modules and reinstall
cd 'C:\Users\Anand\Desktop\CARELYTICS\backend'
rmdir /s node_modules
npm install
npm run dev
```

---

## Files to Check

If signup still fails, verify these files exist and are correct:

### Backend
- ✅ `backend/models/User.js` - User schema
- ✅ `backend/routes/users.js` - User routes
- ✅ `backend/server.js` - Routes mounted
- ✅ `backend/.env` - Configuration

### Frontend
- ✅ `frontend/src/pages/UserAuth.jsx` - Auth page
- ✅ `frontend/src/services/api.js` - API functions
- ✅ `frontend/src/App.jsx` - App logic
- ✅ `frontend/.env` - Environment vars

---

## Detailed Error Messages

### Error: "Please fill in all fields"
**Meaning:** One or more form fields are empty
**Fix:** Fill all fields before clicking Signup

### Error: "Passwords do not match"
**Meaning:** Password and confirm password are different
**Fix:** Make sure both password fields are identical

### Error: "Password must be at least 6 characters"
**Meaning:** Password is too short
**Fix:** Use password with 6+ characters

### Error: "User already exists with this email"
**Meaning:** Email is already registered
**Fix:** Use different email address

### Error: "Cannot connect to database"
**Meaning:** MongoDB not accessible
**Fix:** Check internet, verify credentials in .env

### Error: "Invalid email"
**Meaning:** Email format is invalid
**Fix:** Use valid email like `user@example.com`

---

## Next Steps if Still Failing

1. **Check backend logs**
   - Look at Terminal 1 running backend
   - See if there are error messages
   - Copy error message

2. **Check network tab**
   - F12 → Network → Try signup
   - Click the POST request
   - Check Request and Response
   - See exact error returned

3. **Verify MongoDB**
   - Run `npm run seed` in backend folder
   - Should connect successfully
   - If fails, MongoDB isn't accessible

4. **Check file contents**
   - Verify api.js has userSignup function
   - Verify UserAuth.jsx imports correctly
   - Verify backend/routes/users.js exists

5. **Restart everything**
   - Close all terminals
   - Kill any Node processes
   - Start fresh from Step 6

---

## Success Indicators

When signup works:
✅ No errors in browser console
✅ Network tab shows 201 status
✅ Response has `"success": true`
✅ Message: "Account created successfully!"
✅ Redirect to dashboard
✅ User appears in database

---

**If you still have issues, collect:**
1. Backend console output
2. Browser console error message
3. Network tab response
4. Which step failed

Then we can fix it! 🔧

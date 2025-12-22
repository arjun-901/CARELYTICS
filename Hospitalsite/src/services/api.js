const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

function getToken() {
  try { return localStorage.getItem('hospital_token') }
  catch (e) { return null }
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function loginHospital({ hospitalId, password }) {
  const res = await fetch(`${API_BASE}/hospitals/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hospitalId, password })
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error || 'Login failed')
  }
  const data = await res.json()
  // Store token for subsequent requests
  if (data.token) localStorage.setItem('hospital_token', data.token)
  return data
}

async function getHospitalDetails() {
  const res = await fetch(`${API_BASE}/hospitals/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authHeaders() }
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error || 'Failed to fetch details')
  }
  return await res.json()
}

async function updateHospitalDetails(updates) {
  const res = await fetch(`${API_BASE}/hospitals/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(updates)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error || 'Failed to update details')
  }
  return await res.json()
}

// Doctor endpoints
async function createDoctor(data) {
  const res = await fetch(`${API_BASE}/doctors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create doctor')
  return await res.json()
}

async function getDoctors() {
  const res = await fetch(`${API_BASE}/doctors`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authHeaders() }
  })
  if (!res.ok) throw new Error('Failed to fetch doctors')
  return await res.json()
}

async function updateDoctor(id, data) {
  const res = await fetch(`${API_BASE}/doctors/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update doctor')
  return await res.json()
}

async function deleteDoctor(id) {
  const res = await fetch(`${API_BASE}/doctors/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeaders() }
  })
  if (!res.ok) throw new Error('Failed to delete doctor')
  return await res.json()
}

// Patient endpoints
async function createPatient(data) {
  const res = await fetch(`${API_BASE}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to create patient')
  return await res.json()
}

async function getPatients() {
  const res = await fetch(`${API_BASE}/patients`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authHeaders() }
  })
  if (!res.ok) throw new Error('Failed to fetch patients')
  return await res.json()
}

async function updatePatient(id, data) {
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update patient')
  return await res.json()
}

async function deletePatient(id) {
  const res = await fetch(`${API_BASE}/patients/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeaders() }
  })
  if (!res.ok) throw new Error('Failed to delete patient')
  return await res.json()
}

export {
  loginHospital,
  getHospitalDetails,
  updateHospitalDetails,
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  createPatient,
  getPatients,
  updatePatient,
  deletePatient
}

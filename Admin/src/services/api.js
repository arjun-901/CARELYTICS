const API_BASE = import.meta.env.VITE_API_BASE || ''

function getToken() {
  try { return localStorage.getItem('admin_token') }
  catch (e) { return null }
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function loginAdmin({ email, password }) {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
      const err = await res.json().catch(() => null)
      throw new Error(err?.error || 'Login failed')
    }
    const data = await res.json()
    // store token for subsequent requests
    if (data.token) localStorage.setItem('admin_token', data.token)
    return data
  }

  // Fallback to built-in credentials
  const DEFAULT = { email: 'admin@care.com', password: 'admin123', name: 'Admin' }
  if (email === DEFAULT.email && password === DEFAULT.password) {
    const fallback = { email: DEFAULT.email, name: DEFAULT.name }
    // no token in fallback
    return fallback
  }
  throw new Error('Invalid admin credentials')
}

async function createHospital(payload) {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/hospitals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const txt = await res.text().catch(() => null)
      try {
        const json = JSON.parse(txt)
        throw new Error(json.error || 'Failed to create hospital')
      } catch (_) {
        throw new Error(txt || 'Failed to create hospital')
      }
    }
    return await res.json()
  }

  // Fallback: save to localStorage and return stored object
  try {
    const existing = JSON.parse(localStorage.getItem('hospitals') || '[]')
    const item = { ...payload, createdAt: new Date().toISOString() }
    const updated = [item, ...existing]
    localStorage.setItem('hospitals', JSON.stringify(updated))
    return item
  } catch (e) {
    throw new Error('Failed to save locally')
  }
}

async function getHospitals() {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/hospitals`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...authHeaders() }
    })
    if (!res.ok) {
      const txt = await res.text().catch(() => null)
      try { const json = JSON.parse(txt); throw new Error(json.error || 'Failed to fetch') } catch (_) { throw new Error(txt || 'Failed to fetch') }
    }
    return await res.json()
  }

  return JSON.parse(localStorage.getItem('hospitals') || '[]')
}

async function deleteHospital(hospitalId) {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}/hospitals/${hospitalId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...authHeaders() }
    })
    if (!res.ok) {
      const err = await res.json().catch(() => null)
      throw new Error(err?.error || 'Failed to delete hospital')
    }
    return await res.json()
  }

  // Fallback: delete from localStorage
  const existing = JSON.parse(localStorage.getItem('hospitals') || '[]')
  const updated = existing.filter(h => h._id !== hospitalId && h.hospitalId !== hospitalId)
  localStorage.setItem('hospitals', JSON.stringify(updated))
  return { message: 'Hospital deleted successfully' }
}

export { loginAdmin, createHospital, getHospitals, deleteHospital }

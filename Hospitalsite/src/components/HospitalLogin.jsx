import React, { useState } from 'react'
import { loginHospital } from '../services/api'

const HospitalLogin = ({ onLogin }) => {
  const [hospitalId, setHospitalId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await loginHospital({ hospitalId, password })
      if (data && data.hospital) {
        localStorage.setItem('hospital', JSON.stringify(data.hospital))
        onLogin(data.hospital)
      } else {
        setError('Login failed')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Hospital Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <div>
          <label>Hospital ID</label>
          <input
            type="text"
            value={hospitalId}
            onChange={e => setHospitalId(e.target.value)}
            required
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: 10, cursor: 'pointer' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <div style={{ marginTop: 10, color: 'red' }}>{error}</div>}
    </div>
  )
}

export default HospitalLogin

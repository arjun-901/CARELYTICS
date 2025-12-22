import React, { useState, useEffect } from 'react'
import HospitalLogin from './components/HospitalLogin'
import HospitalDashboard from './components/HospitalDashboard'

const App = () => {
  const [hospital, setHospital] = useState(null)

  useEffect(() => {
    // Check if hospital is logged in (persisted in localStorage)
    try {
      const stored = localStorage.getItem('hospital')
      if (stored) {
        setHospital(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to restore hospital session:', e)
    }
  }, [])

  const handleLogin = (hospitalData) => {
    setHospital(hospitalData)
  }

  const handleLogout = () => {
    setHospital(null)
    localStorage.removeItem('hospital')
    localStorage.removeItem('hospital_token')
  }

  return (
    <div>
      {!hospital ? (
        <HospitalLogin onLogin={handleLogin} />
      ) : (
        <HospitalDashboard hospital={hospital} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
import React, { useState } from 'react'
import Login from './components/Login'
import AddHospital from './components/AddHospital'

const App = () => {
  const [admin, setAdmin] = useState(null)

  const handleLogin = (adminInfo) => {
    setAdmin(adminInfo)
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setAdmin(null)
      localStorage.removeItem('admin')
      localStorage.removeItem('admin_token')
    }
  }

  if (!admin) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-full p-2">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">CARELYTICS</h1>
                <p className="text-xs text-gray-600">Hospital Management System</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{admin.name || admin.email}</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-200 flex items-center gap-2"
              >
                <span>🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AddHospital admin={admin} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-600 text-sm">© 2025 CARELYTICS. All rights reserved. | Admin Panel v1.0</p>
        </div>
      </footer>
    </div>
  )
}

export default App
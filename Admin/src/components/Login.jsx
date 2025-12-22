import React, { useState } from 'react'
import { loginAdmin } from '../services/api'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const admin = await loginAdmin({ email, password })
      if (admin && admin.email) {
        localStorage.setItem('admin', JSON.stringify(admin))
        if (admin.token) localStorage.setItem('admin_token', admin.token)
        onLogin(admin)
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-4 mb-4 shadow-lg">
            <span className="text-4xl">🏥</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">CARELYTICS</h1>
          <p className="text-blue-100 text-sm">Hospital Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h2>
          <p className="text-gray-600 text-sm mb-6">Access the administration panel</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@care.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm font-semibold">⚠️ {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin">⏳</span>
                  Logging in...
                </>
              ) : (
                <>
                  <span>🔐</span>
                  Login to Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Default Credentials Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3 font-semibold">Default Credentials (for testing):</p>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-700"><strong>Email:</strong> admin@care.com</p>
              <p className="text-xs text-gray-700"><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-xs mt-6">© 2025 CARELYTICS. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Login

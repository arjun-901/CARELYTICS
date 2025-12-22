import React, { useState } from "react";
import { loginAdmin } from "../services/api";

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("admin@care.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginAdmin(email, password);
      localStorage.setItem("admin_token", response.token);
      localStorage.setItem("admin_email", response.email);
      localStorage.setItem("admin_name", response.name);
      onLoginSuccess(response);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">🏥 CARELYTICS</h1>
            <p className="text-blue-100">Hospital Management System</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="admin@care.com"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Info */}
            <div className="mt-6 text-sm text-gray-600 text-center">
              <p className="mb-2">Default Credentials:</p>
              <p>Email: <span className="font-semibold">admin@care.com</span></p>
              <p>Password: <span className="font-semibold">admin123</span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

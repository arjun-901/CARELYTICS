import React, { useState } from "react";
import { userSignup, userLogin } from "../services/api";

export default function UserAuth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const response = await userLogin(formData.email, formData.password);

      if (response.success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          onLoginSuccess(response.user);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      const response = await userSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      });

      if (response.success) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          onLoginSuccess(response.user);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isLogin ? handleLogin : handleSignup;

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

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            {/* Name Field (Signup Only) */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirm Password (Signup Only) */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••••"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Phone Field (Signup Only) */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            )}

            {/* Address Field (Signup Only) */}
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address (Optional)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="123 Main Street"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 mb-4"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  {isLogin ? "Logging in..." : "Creating account..."}
                </span>
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Toggle Between Login and Signup */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                    setSuccess(null);
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      phone: "",
                      address: "",
                    });
                  }}
                  className="text-blue-600 font-semibold hover:text-blue-700 ml-1"
                >
                  {isLogin ? "Sign up here" : "Login here"}
                </button>
              </p>
            </div>

            {/* Demo Credentials (Login Only) */}
            {isLogin && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
                <p className="text-xs text-gray-600 text-center">
                  Email: <span className="font-semibold">test@example.com</span>
                </p>
                <p className="text-xs text-gray-600 text-center">
                  Password: <span className="font-semibold">test123</span>
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Footer Message */}
        <div className="mt-6 text-center text-blue-100">
          <p className="text-sm">Secure Hospital Management Platform</p>
        </div>
      </div>
    </div>
  );
}

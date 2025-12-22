import React, { useState } from "react";

export default function Navbar({ user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full p-4 bg-white shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-blue-600"> CARELYTICS</div>
       
      </div>
      <div className="flex items-center gap-4 relative">
        {/* Real-time Status */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition"
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-800">{user?.name || "User"}</div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {user?.name?.charAt(0) || "U"}
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    onLogout();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

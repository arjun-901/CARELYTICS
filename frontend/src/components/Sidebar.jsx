import React from "react";
import { NavLink } from "react-router-dom";

const items = [
  { path: "/", label: " Dashboard" },
  { path: "/hospitals", label: " Hospitals" },
  { path: "/beds", label: " Beds" },
  { path: "/medicine", label: " Medicine Stock" },
  { path: "/blood", label: "Blood Units" },
  { path: "/ambulances", label: " Ambulances" },
  { path: "/doctors", label: "Doctors" },
  { path: "/patients", label: "Patients" },
 
];

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 min-h-screen text-white p-6 hidden md:flex flex-col">
      {/* Logo */}
      <div className="text-2xl font-bold mb-8 text-blue-100">
        CARELYTICS
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {items.map(i => (
          <NavLink
            to={i.path}
            key={i.path}
            className={({isActive}) => `px-4 py-2 rounded-lg transition ${
              isActive 
                ? 'bg-blue-600 text-white font-semibold' 
                : 'text-blue-100 hover:bg-blue-700/50'
            }`}
            end
          >
            {i.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold mt-auto"
      >
        🚪 Logout
      </button>
    </aside>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllHospitals } from "../services/api";
import StatCard from "../components/StatCard";

export default function Hospitals() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch hospitals data
  const loadHospitals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("user_token");
      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }
      
      const response = await fetchAllHospitals();
      setHospitals(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load hospitals");
      console.error("Error loading hospitals:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load only
  useEffect(() => {
    loadHospitals();
  }, []);

  // Get statistics
  const getTotalStats = () => {
    return {
      totalHospitals: hospitals.length,
      totalBeds: hospitals.reduce((sum, h) => sum + (h.beds?.total || 0), 0),
      totalAmbulances: hospitals.reduce((sum, h) => sum + (h.ambulances?.total || 0), 0),
      totalBlood: hospitals.reduce((sum, h) => sum + Object.values(h.bloodUnits || {}).reduce((s, v) => s + v, 0), 0),
    };
  };

  const stats = getTotalStats();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hospital Management</h1>
        <p className="text-gray-600 mt-2">Real-time monitoring of all hospitals</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Hospitals"
          value={stats.totalHospitals}
          icon="🏥"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard
          title="Total Beds"
          value={stats.totalBeds}
          icon="🛏️"
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatCard
          title="Total Ambulances"
          value={stats.totalAmbulances}
          icon="🚑"
          bgColor="bg-red-50"
          textColor="text-red-600"
        />
        <StatCard
          title="Blood Units"
          value={stats.totalBlood}
          icon="🩸"
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Hospitals
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg transition ${
                filter === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Active
            </button>
          </div>
          <button
            onClick={loadHospitals}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading hospitals...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && hospitals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No hospitals found. Create one to get started.</p>
        </div>
      ) : (
        <div>
          {/* Hospitals List - Grid View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {hospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                {/* Hospital Header */}
                <div 
                  onClick={() => navigate(`/hospital/${hospital._id}`)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg hover:from-blue-700 hover:to-blue-800 transition"
                >
                  <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                  <p className="text-blue-100">ID: {hospital.hospitalId}</p>
                </div>

                {/* Hospital Details */}
                <div className="p-6">
                  {/* Location */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      📍 Location
                    </label>
                    <p className="text-gray-600">{hospital.address || "N/A"}</p>
                  </div>

                  {/* Beds */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700">🛏️ Beds</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {hospital.beds?.available || 0}/{hospital.beds?.total || 0}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Available/Total</p>
                    </div>

                    {/* Ambulances */}
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-700">🚑 Ambulances</p>
                      <p className="text-2xl font-bold text-red-600 mt-1">
                        {hospital.ambulances?.available || 0}/{hospital.ambulances?.total || 0}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Available/Total</p>
                    </div>
                  </div>

                  {/* Medicine Stock */}
                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-gray-700">💊 Medicine Stock</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                      {hospital.medicineStock?.length || 0} types
                    </p>
                    {hospital.medicineStock?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {hospital.medicineStock.slice(0, 3).map((med, idx) => (
                          <span key={idx} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            {med.name} ({med.quantity})
                          </span>
                        ))}
                        {hospital.medicineStock.length > 3 && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            +{hospital.medicineStock.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Blood Bank */}
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-gray-700">🩸 Blood Bank</p>
                    {Object.keys(hospital.bloodUnits || {}).length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {Object.entries(hospital.bloodUnits || {}).map(([type, units]) => (
                          <div key={type} className="text-sm">
                            <span className="font-semibold text-gray-700">{type}:</span>
                            <span className="text-purple-600 ml-1 font-bold">{units} units</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 mt-2">No blood units recorded</p>
                    )}
                  </div>

                  {/* Doctor and Patient Count */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <p className="text-sm font-semibold text-gray-700">👨‍⚕️ Doctors</p>
                      <p className="text-xl font-bold text-blue-600 mt-1">
                        {hospital.doctors?.length ?? hospital.totalDoctors ?? 0}
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg text-center">
                      <p className="text-sm font-semibold text-gray-700">👥 Patients</p>
                      <p className="text-xl font-bold text-indigo-600 mt-1">
                        {hospital.patients?.length ?? hospital.totalPatients ?? 0}
                      </p>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Updated: {new Date(hospital.updatedAt).toLocaleTimeString()}
                  </div>
                </div>

                {/* Full Dashboard Button */}
                <div className="border-t border-gray-200 px-6 py-3 text-center">
                  <button 
                    onClick={() => navigate(`/hospital/${hospital._id}`)}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition"
                  >
                    📊 View Full Dashboard →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span className="text-sm text-gray-600">Click refresh to update</span>
      </div>
    </div>
  );
}
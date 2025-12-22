import React, { useEffect, useState } from "react";
import { fetchAllHospitals } from "../services/api";

export default function Beds() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("user_token");
        if (!token) throw new Error("Please login first");
        
        const response = await fetchAllHospitals();
        setHospitals(response.data || response);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load hospitals");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalBedsAvailable = hospitals.reduce((sum, h) => sum + (h.beds?.available || 0), 0);
  const totalBeds = hospitals.reduce((sum, h) => sum + (h.beds?.total || 0), 0);
  const occupiedBeds = totalBeds - totalBedsAvailable;
  const occupancyRate = totalBeds ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">🛏️ Beds Management</h1>
        <p className="text-green-100 text-lg">Monitor bed availability across all hospitals</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">Total Beds</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalBeds}</p>
          <p className="text-xs text-gray-500 mt-2">Across all hospitals</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">Available Beds</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalBedsAvailable}</p>
          <p className="text-xs text-gray-500 mt-2">Ready for patients</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-semibold">Occupied Beds</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{occupiedBeds}</p>
          <p className="text-xs text-gray-500 mt-2">Currently in use</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-semibold">Occupancy Rate</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{occupancyRate}%</p>
          <p className="text-xs text-gray-500 mt-2">Hospital capacity</p>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600">Loading bed data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">⚠️ {error}</p>
        </div>
      )}

      {/* Hospitals Bed Table */}
      {!loading && !error && hospitals.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Hospital Bed Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Hospital Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Address</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Total Beds</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Available</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Occupied</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Occupancy %</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, idx) => {
                  const total = hospital.beds?.total || 0;
                  const available = hospital.beds?.available || 0;
                  const occupied = total - available;
                  const rate = total ? Math.round((occupied / total) * 100) : 0;
                  
                  return (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-800">{hospital.name}</td>
                      <td className="px-6 py-4 text-gray-600">{hospital.address}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{total}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">{available}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">{occupied}</span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{rate}%</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          rate < 50 ? 'bg-green-100 text-green-700' :
                          rate < 80 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {rate < 50 ? '✓ Good' : rate < 80 ? '⚠ Medium' : '✗ Full'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && hospitals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No hospitals found</p>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { fetchAllHospitals } from "../services/api";

export default function Ambulances() {
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

  const totalAmbulances = hospitals.reduce((sum, h) => sum + (h.ambulances?.total || 0), 0);
  const totalAvailable = hospitals.reduce((sum, h) => sum + (h.ambulances?.available || 0), 0);
  const totalInUse = totalAmbulances - totalAvailable;
  const utilizationRate = totalAmbulances ? Math.round((totalInUse / totalAmbulances) * 100) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">🚑 Ambulances Management</h1>
        <p className="text-orange-100 text-lg">Monitor ambulance fleet across all hospitals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-semibold">Total Ambulances</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{totalAmbulances}</p>
          <p className="text-xs text-gray-500 mt-2">Across all hospitals</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">Available</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalAvailable}</p>
          <p className="text-xs text-gray-500 mt-2">Ready for dispatch</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm font-semibold">In Use</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{totalInUse}</p>
          <p className="text-xs text-gray-500 mt-2">Currently deployed</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">Utilization</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{utilizationRate}%</p>
          <p className="text-xs text-gray-500 mt-2">Fleet usage rate</p>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600">Loading ambulance data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">⚠️ {error}</p>
        </div>
      )}

      {/* Ambulances Table */}
      {!loading && !error && hospitals.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Hospital Ambulance Fleet</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Hospital Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Address</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Total</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Available</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">In Use</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Utilization</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, idx) => {
                  const total = hospital.ambulances?.total || 0;
                  const available = hospital.ambulances?.available || 0;
                  const inUse = total - available;
                  const util = total ? Math.round((inUse / total) * 100) : 0;
                  
                  return (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-800">{hospital.name}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{hospital.address}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{total}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">{available}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">{inUse}</span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{util}%</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          util < 50 ? 'bg-green-100 text-green-700' :
                          util < 80 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {util < 50 ? '✓ Good' : util < 80 ? '⚠ Medium' : '✗ High'}
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

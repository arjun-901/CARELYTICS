import React, { useEffect, useState } from "react";
import { fetchAllHospitals } from "../services/api";

export default function BloodBank() {
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

  // Calculate total blood units
  const bloodTypeStats = {};
  hospitals.forEach(hospital => {
    if (hospital.bloodUnits) {
      Object.entries(hospital.bloodUnits).forEach(([type, quantity]) => {
        bloodTypeStats[type] = (bloodTypeStats[type] || 0) + quantity;
      });
    }
  });

  const totalUnits = Object.values(bloodTypeStats).reduce((a, b) => a + b, 0);
  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">🩸 Blood Bank Management</h1>
        <p className="text-red-100 text-lg">Monitor blood unit inventory across all hospitals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm font-semibold">Total Units</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{totalUnits}</p>
          <p className="text-xs text-gray-500 mt-2">All blood types</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">Hospitals</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{hospitals.length}</p>
          <p className="text-xs text-gray-500 mt-2">With inventory</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-semibold">Blood Types</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{Object.keys(bloodTypeStats).length}</p>
          <p className="text-xs text-gray-500 mt-2">Tracked</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">Critical Low</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {Object.values(bloodTypeStats).filter(qty => qty < 10).length}
          </p>
          <p className="text-xs text-gray-500 mt-2">Types below 10 units</p>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-600">Loading blood bank data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">⚠️ {error}</p>
        </div>
      )}

      {/* Blood Type Summary */}
      {!loading && !error && Object.keys(bloodTypeStats).length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Blood Type Inventory</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bloodTypes.map(type => (
              <div key={type} className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
                <p className="text-lg font-bold text-red-600 mb-2">{type}</p>
                <p className="text-3xl font-bold text-gray-800">{bloodTypeStats[type] || 0}</p>
                <p className="text-xs text-gray-600 mt-2">
                  {bloodTypeStats[type] === undefined ? 'No stock' : bloodTypeStats[type] < 10 ? '⚠️ Low' : '✓ OK'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hospital Blood Details Table */}
      {!loading && !error && hospitals.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Blood Inventory by Hospital</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Hospital</th>
                  {bloodTypes.map(type => (
                    <th key={type} className="px-4 py-4 text-center font-semibold text-gray-700 text-sm">{type}</th>
                  ))}
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, idx) => {
                  const hospitalTotal = bloodTypes.reduce((sum, type) => sum + (hospital.bloodUnits?.[type] || 0), 0);
                  return (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-800">{hospital.name}</td>
                      {bloodTypes.map(type => (
                        <td key={type} className="px-4 py-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm font-semibold ${
                            (hospital.bloodUnits?.[type] || 0) < 10 ? 'bg-red-100 text-red-700' :
                            (hospital.bloodUnits?.[type] || 0) === 0 ? 'bg-gray-100 text-gray-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {hospital.bloodUnits?.[type] || 0}
                          </span>
                        </td>
                      ))}
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{hospitalTotal}</td>
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

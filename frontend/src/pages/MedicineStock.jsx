import React, { useEffect, useState } from "react";
import { fetchAllHospitals } from "../services/api";

export default function MedicineStock() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Get all unique medicines
  const allMedicines = {};
  hospitals.forEach(hospital => {
    if (hospital.medicineStock && Array.isArray(hospital.medicineStock)) {
      hospital.medicineStock.forEach(med => {
        if (med.name) {
          if (!allMedicines[med.name]) {
            allMedicines[med.name] = { total: 0, hospitals: [] };
          }
          allMedicines[med.name].total += med.quantity || 0;
          allMedicines[med.name].hospitals.push({
            name: hospital.name,
            quantity: med.quantity || 0
          });
        }
      });
    }
  });

  const totalMedicines = Object.keys(allMedicines).length;
  const totalQuantity = Object.values(allMedicines).reduce((sum, med) => sum + med.total, 0);
  const lowStockCount = Object.values(allMedicines).filter(med => med.total < 50).length;

  const filteredMedicines = Object.entries(allMedicines)
    .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort(([, a], [, b]) => b.total - a.total);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">💊 Medicine Stock Management</h1>
        <p className="text-purple-100 text-lg">Monitor medicine inventory across all hospitals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-semibold">Total Medicines</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{totalMedicines}</p>
          <p className="text-xs text-gray-500 mt-2">Unique types</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">Total Quantity</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalQuantity}</p>
          <p className="text-xs text-gray-500 mt-2">Units in stock</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-semibold">Low Stock</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{lowStockCount}</p>
          <p className="text-xs text-gray-500 mt-2">Below 50 units</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">Hospitals</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{hospitals.length}</p>
          <p className="text-xs text-gray-500 mt-2">With inventory</p>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600">Loading medicine data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">⚠️ {error}</p>
        </div>
      )}

      {/* Medicines List */}
      {!loading && !error && filteredMedicines.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Medicine Inventory</h2>
            <input
              type="text"
              placeholder="🔍 Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Medicine Name</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Total Stock</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Hospitals</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map(([medName, medData], idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-800">{medName}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xl font-bold text-gray-700">{medData.total}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {medData.hospitals.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        medData.total > 100 ? 'bg-green-100 text-green-700' :
                        medData.total > 50 ? 'bg-yellow-100 text-yellow-700' :
                        medData.total > 20 ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {medData.total > 100 ? '✓ Full' : medData.total > 50 ? '⚠ Good' : medData.total > 20 ? '⚠ Low' : '✗ Critical'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {medData.hospitals.map((h, i) => (
                        <div key={i} className="text-xs">
                          {h.name}: <strong>{h.quantity}</strong> units
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && filteredMedicines.length === 0 && searchTerm && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No medicines found matching "{searchTerm}"</p>
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

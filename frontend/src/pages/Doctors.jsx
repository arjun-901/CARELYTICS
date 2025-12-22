import React, { useEffect, useState } from "react";
import { fetchAllHospitals } from "../services/api";

export default function Doctors() {
  const [hospitals, setHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("user_token");
        if (!token) throw new Error("Please login first");
        
        const response = await fetchAllHospitals();
        const hospitalsData = response.data || response;
        setHospitals(hospitalsData);

        // Collect all doctors from all hospitals
        const doctors = [];
        hospitalsData.forEach(hospital => {
          if (hospital.doctors && Array.isArray(hospital.doctors)) {
            hospital.doctors.forEach(doc => {
              doctors.push({
                ...doc,
                hospitalName: hospital.name,
                hospitalId: hospital._id
              });
            });
          }
        });
        setAllDoctors(doctors);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalDoctors = allDoctors.length;
  const specializations = [...new Set(allDoctors.map(d => d.specialization).filter(Boolean))];
  const availableDoctors = allDoctors.filter(d => d.isAvailable).length;

  const filteredDoctors = allDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHospital = selectedHospital === "all" || doc.hospitalId === selectedHospital;
    return matchesSearch && matchesHospital;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">👨‍⚕️ Doctors Management</h1>
        <p className="text-blue-100 text-lg">View and manage medical staff across all hospitals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">Total Doctors</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalDoctors}</p>
          <p className="text-xs text-gray-500 mt-2">Registered</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">Available Now</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{availableDoctors}</p>
          <p className="text-xs text-gray-500 mt-2">Ready for duty</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-semibold">Specializations</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{specializations.length}</p>
          <p className="text-xs text-gray-500 mt-2">Types available</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-semibold">Hospitals</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{hospitals.length}</p>
          <p className="text-xs text-gray-500 mt-2">With staff</p>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading doctors data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">⚠️ {error}</p>
        </div>
      )}

      {/* Filters */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="🔍 Search by name, email, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Hospitals</option>
              {hospitals.map(h => (
                <option key={h._id} value={h._id}>{h.name}</option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-600">
            Showing <strong>{filteredDoctors.length}</strong> of <strong>{totalDoctors}</strong> doctors
          </p>
        </div>
      )}

      {/* Doctors Grid */}
      {!loading && !error && filteredDoctors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500"
            >
              {/* Doctor Card Header */}
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 border-b border-blue-200">
                <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-blue-600 font-semibold">{doctor.specialization || "General"}</p>
              </div>

              {/* Doctor Card Body */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">HOSPITAL</p>
                  <p className="text-sm text-gray-700 font-semibold">{doctor.hospitalName}</p>
                </div>

                {doctor.email && (
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">EMAIL</p>
                    <p className="text-sm text-gray-700 break-all">{doctor.email}</p>
                  </div>
                )}

                {doctor.phone && (
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">PHONE</p>
                    <p className="text-sm text-gray-700">{doctor.phone}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold mb-1">STATUS</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    doctor.isAvailable
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {doctor.isAvailable ? '🟢 Available' : '🔴 Busy'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredDoctors.length === 0 && searchTerm && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No doctors found matching your search</p>
        </div>
      )}

      {!loading && hospitals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No hospitals or doctors found</p>
        </div>
      )}
    </div>
  );
}
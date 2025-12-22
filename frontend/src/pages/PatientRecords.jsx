
import React, { useEffect, useState } from "react";
import { fetchAllHospitals } from "../services/api";

export default function PatientRecords() {
  const [hospitals, setHospitals] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("user_token");
        if (!token) throw new Error("Please login first");
        
        const response = await fetchAllHospitals();
        const hospitalsData = response.data || response;
        setHospitals(hospitalsData);

        // Collect all patients from all hospitals
        const patients = [];
        hospitalsData.forEach(hospital => {
          if (hospital.patients && Array.isArray(hospital.patients)) {
            hospital.patients.forEach(patient => {
              patients.push({
                ...patient,
                hospitalName: hospital.name,
                hospitalId: hospital._id
              });
            });
          }
        });
        setAllPatients(patients);
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

  const totalPatients = allPatients.length;
  const maleCount = allPatients.filter(p => p.gender?.toLowerCase() === 'male').length;
  const femaleCount = allPatients.filter(p => p.gender?.toLowerCase() === 'female').length;
  const avgAge = totalPatients > 0 
    ? Math.round(allPatients.reduce((sum, p) => sum + (p.age || 0), 0) / totalPatients) 
    : 0;

  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone?.includes(searchTerm);
    const matchesHospital = selectedHospital === "all" || patient.hospitalId === selectedHospital;
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesHospital && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'admitted':
        return 'bg-red-100 text-red-700';
      case 'recovering':
        return 'bg-yellow-100 text-yellow-700';
      case 'discharged':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">👥 Patient Records Management</h1>
        <p className="text-pink-100 text-lg">Manage patient information and medical history</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
          <p className="text-gray-600 text-sm font-semibold">Total Patients</p>
          <p className="text-3xl font-bold text-pink-600 mt-2">{totalPatients}</p>
          <p className="text-xs text-gray-500 mt-2">Registered</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">Male</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{maleCount}</p>
          <p className="text-xs text-gray-500 mt-2">{totalPatients > 0 ? Math.round((maleCount / totalPatients) * 100) : 0}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm font-semibold">Female</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{femaleCount}</p>
          <p className="text-xs text-gray-500 mt-2">{totalPatients > 0 ? Math.round((femaleCount / totalPatients) * 100) : 0}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-semibold">Average Age</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{avgAge}</p>
          <p className="text-xs text-gray-500 mt-2">Years</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">Hospitals</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{hospitals.length}</p>
          <p className="text-xs text-gray-500 mt-2">Facilities</p>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mb-4"></div>
          <p className="text-gray-600">Loading patient records...</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="🔍 Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Hospitals</option>
              {hospitals.map(h => (
                <option key={h._id} value={h._id}>{h.name}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Status</option>
              <option value="admitted">Admitted</option>
              <option value="recovering">Recovering</option>
              <option value="discharged">Discharged</option>
            </select>
          </div>
          <p className="text-sm text-gray-600">
            Showing <strong>{filteredPatients.length}</strong> of <strong>{totalPatients}</strong> patients
          </p>
        </div>
      )}

      {/* Patients Table */}
      {!loading && !error && filteredPatients.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Patient Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Hospital</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Age</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Gender</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Diagnosis</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Bed</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-800">{patient.name}</td>
                    <td className="px-6 py-4 text-gray-600">{patient.hospitalName}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{patient.age || "—"}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm">{patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1).toLowerCase() || "—"}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {patient.phone && <div>{patient.phone}</div>}
                      {patient.email && <div className="text-xs">{patient.email}</div>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{patient.diagnosis || "—"}</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-700">{patient.bedNumber || "—"}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
                        {patient.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && filteredPatients.length === 0 && searchTerm && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No patients found matching your search</p>
        </div>
      )}

      {!loading && hospitals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No hospitals or patients found</p>
        </div>
      )}
    </div>
  );
}
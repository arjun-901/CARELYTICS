import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import AdmissionsChart from "../charts/AdmissionsChart";
import RecoveryChart from "../charts/RecoveryChart";
import PerformancePie from "../charts/PerformancePie";

export default function HospitalDetail() {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Load hospital data
  useEffect(() => {
    const loadHospital = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("user_token");
        if (!token) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/hospitals`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        
        const found = data.find(h => h._id === hospitalId);
        if (found) {
          setHospital(found);
          setError(null);
        } else {
          setError("Hospital not found");
        }
      } catch (err) {
        setError("Failed to load hospital details");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHospital();
  }, [hospitalId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/hospitals")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Hospitals
          </button>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Hospital not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate("/hospitals")}
              className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-2"
            >
              ← Back to Hospitals
            </button>
            <h1 className="text-4xl font-bold text-gray-800">{hospital.name}</h1>
            <p className="text-gray-600 mt-1">Hospital ID: {hospital.hospitalId}</p>
          </div>
        </div>

        {/* Basic Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospital Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
              <p className="text-gray-600">{hospital.address}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Hospital ID</label>
              <p className="text-gray-600">{hospital.hospitalId}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Created Date</label>
              <p className="text-gray-600">
                {hospital.createdAt ? new Date(hospital.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon="🛏️"
            title="Available Beds"
            value={hospital.beds?.available || 0}
            total={hospital.beds?.total || 0}
            color="bg-green-100 text-green-800"
          />
          <StatCard
            icon="🚑"
            title="Available Ambulances"
            value={hospital.ambulances?.available || 0}
            total={hospital.ambulances?.total || 0}
            color="bg-red-100 text-red-800"
          />
          <StatCard
            icon="👨‍⚕️"
            title="Doctors"
            value={hospital.doctors?.length ?? hospital.totalDoctors ?? 0}
            color="bg-blue-100 text-blue-800"
          />
          <StatCard
            icon="👥"
            title="Patients"
            value={hospital.patients?.length ?? hospital.totalPatients ?? 0}
            color="bg-indigo-100 text-indigo-800"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {[
              { id: "overview", label: "📊 Overview" },
              { id: "beds", label: "🛏️ Beds" },
              { id: "medicine", label: "💊 Medicine" },
              { id: "blood", label: "🩸 Blood Bank" },
              { id: "ambulances", label: "🚑 Ambulances" },
              { id: "doctors", label: "👨‍⚕️ Doctors" },
              { id: "patients", label: "👥 Patients" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 font-semibold text-center transition ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard
                    icon="🛏️"
                    title="Beds"
                    value={hospital.beds?.available || 0}
                    total={hospital.beds?.total || 0}
                    color="bg-blue-50 text-blue-800"
                  />
                  <StatCard
                    icon="💊"
                    title="Medicine Stock"
                    value={hospital.medicineStock?.length || 0}
                    color="bg-purple-50 text-purple-800"
                  />
                  <StatCard
                    icon="🩸"
                    title="Blood Units"
                    value={Object.values(hospital.bloodUnits || {}).reduce((a, b) => a + b, 0) || 0}
                    color="bg-pink-50 text-pink-800"
                  />
                  <StatCard
                    icon="🚑"
                    title="Ambulances"
                    value={hospital.ambulances?.available || 0}
                    total={hospital.ambulances?.total || 0}
                    color="bg-green-50 text-green-800"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-semibold text-lg mb-2">Admissions</h3>
                    <AdmissionsChart hospital={hospital} />
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-semibold text-lg mb-2">Patient Recovery</h3>
                    <RecoveryChart hospital={hospital} />
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-semibold text-lg mb-2">Hospital Performance</h3>
                    <PerformancePie hospital={hospital} />
                  </div>
                </div>
              </div>
            )}

            {/* Beds Tab */}
            {activeTab === "beds" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">🛏️ Bed Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Beds</p>
                      <p className="text-3xl font-bold text-gray-800">{hospital.beds?.total || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Available Beds</p>
                      <p className="text-3xl font-bold text-green-600">{hospital.beds?.available || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Occupied Beds</p>
                      <p className="text-3xl font-bold text-orange-600">
                        {(hospital.beds?.total || 0) - (hospital.beds?.available || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Occupancy Rate</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {hospital.beds?.total ? Math.round(((hospital.beds?.total - hospital.beds?.available) / hospital.beds?.total) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Medicine Tab */}
            {activeTab === "medicine" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">💊 Medicine Stock</h3>
                {hospital.medicineStock && hospital.medicineStock.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200 border-b-2 border-gray-300">
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Medicine Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Quantity (Units)</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hospital.medicineStock.map((med, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-700">{med.name}</td>
                            <td className="px-4 py-3 font-semibold text-gray-800">{med.quantity}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  med.quantity > 50
                                    ? "bg-green-100 text-green-800"
                                    : med.quantity > 20
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {med.quantity > 50 ? "Adequate" : med.quantity > 20 ? "Low" : "Critical"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No medicine stock available</p>
                )}
              </div>
            )}

            {/* Blood Bank Tab */}
            {activeTab === "blood" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">🩸 Blood Bank Inventory</h3>
                {hospital.bloodUnits && Object.keys(hospital.bloodUnits).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(hospital.bloodUnits).map(([type, units]) => (
                      <div key={type} className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
                        <p className="text-lg font-bold text-gray-800 mb-2">{type}</p>
                        <p className="text-4xl font-bold text-red-600">{units}</p>
                        <p className="text-xs text-gray-600 mt-2">Units in Stock</p>
                        <span
                          className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${
                            units > 20 ? "bg-green-100 text-green-800" : units > 10 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {units > 20 ? "Adequate" : units > 10 ? "Low" : "Critical"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No blood units available</p>
                )}
              </div>
            )}

            {/* Ambulances Tab */}
            {activeTab === "ambulances" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">🚑 Ambulance Fleet</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Ambulances</p>
                      <p className="text-3xl font-bold text-gray-800">{hospital.ambulances?.total || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Available Ambulances</p>
                      <p className="text-3xl font-bold text-green-600">{hospital.ambulances?.available || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">In Use</p>
                      <p className="text-3xl font-bold text-orange-600">
                        {(hospital.ambulances?.total || 0) - (hospital.ambulances?.available || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Availability Rate</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {hospital.ambulances?.total ? Math.round((hospital.ambulances?.available / hospital.ambulances?.total) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Doctors Tab */}
            {activeTab === "doctors" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">👨‍⚕️ Medical Staff</h3>
                {hospital.doctors && hospital.doctors.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200 border-b-2 border-gray-300">
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Doctor Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Specialization</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Phone</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Email</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hospital.doctors.map((doc, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-700 font-semibold">{doc.name || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-700">{doc.specialization || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-700">{doc.phone || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-700">{doc.email || "N/A"}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  doc.isAvailable
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {doc.isAvailable ? "Available" : "Busy"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No doctors available</p>
                )}
              </div>
            )}

            {/* Patients Tab */}
            {activeTab === "patients" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">👥 Patient Records</h3>
                {hospital.patients && hospital.patients.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200 border-b-2 border-gray-300">
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Patient Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Age</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Email</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Diagnosis</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Admission Date</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hospital.patients.map((patient, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-700 font-semibold">{patient.name || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-700">{patient.age || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-700">{patient.email || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-700">{patient.diagnosis || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-700">
                              {patient.admissionDate
                                ? new Date(patient.admissionDate).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  patient.isAdmitted
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {patient.isAdmitted ? "Admitted" : "Discharged"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">No patient records available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

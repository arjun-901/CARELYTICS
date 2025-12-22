import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UserAuth from "./pages/UserAuth";
import Dashboard from "./pages/Dashboard";
import Beds from "./pages/Beds";
import MedicineStock from "./pages/MedicineStock";
import BloodBank from "./pages/BloodBank";
import Ambulances from "./pages/Ambulances";
import Analytics from "./pages/Analytics";
import Doctors from "./pages/Doctors";
import Hospitals from "./pages/Hospitals";
import HospitalDetail from "./pages/HospitalDetail";
import PatientRecords from "./pages/PatientRecords";
import Footer from "./components/Footer";

export default function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const email = localStorage.getItem("user_email");
    const name = localStorage.getItem("user_name");
    const userId = localStorage.getItem("user_id");

    if (token && email && name) {
      setUser({ 
        id: userId,
        email, 
        name, 
        token 
      });
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login/signup if not authenticated
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<UserAuth onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Show dashboard if authenticated
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1 flex flex-col">
          <Navbar user={user} onLogout={handleLogout} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/beds" element={<Beds />} />
              <Route path="/medicine" element={<MedicineStock />} />
              <Route path="/blood" element={<BloodBank />} />
              <Route path="/ambulances" element={<Ambulances />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/hospital/:hospitalId" element={<HospitalDetail />} />
              <Route path="/patients" element={<PatientRecords />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

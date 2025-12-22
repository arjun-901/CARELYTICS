import axios from "axios";
import { io } from "socket.io-client";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: API_BASE + "/api",
});

// User Authentication
export const userSignup = async (userData) => {
  const response = await axiosInstance.post("/users/signup", userData);
  if (response.data.token) {
    localStorage.setItem("user_token", response.data.token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  }
  return response.data;
};

export const userLogin = async (email, password) => {
  const response = await axiosInstance.post("/users/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("user_token", response.data.token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_id");
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("user_token");
  return axiosInstance.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateUserProfile = (userData) => {
  const token = localStorage.getItem("user_token");
  return axiosInstance.patch("/users/update", userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Admin Authentication
export const loginAdmin = async (email, password) => {
  const response = await axiosInstance.post("/admin/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("admin_token", response.data.token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
  }
  return response.data;
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin_token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Hospital List endpoints
export const fetchAllHospitals = () => {
  const token = localStorage.getItem("user_token");
  return axiosInstance.get("/hospitals", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const fetchHospitalDetails = (hospitalId) => {
  const token = localStorage.getItem("user_token");
  return axiosInstance.get(`/hospitals/${hospitalId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createHospital = (hospitalData) => {
  const token = localStorage.getItem("admin_token");
  return axiosInstance.post("/hospitals", hospitalData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// REST endpoints
export const fetchStatus = () => axiosInstance.get("/status");
export const fetchHospitals = () => axiosInstance.get("/hospitals");

// Socket.io client
export const socket = io(API_BASE, { autoConnect: false });

export default {
  userSignup,
  userLogin,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
  loginAdmin,
  logoutAdmin,
  fetchAllHospitals,
  fetchHospitalDetails,
  createHospital,
  fetchStatus,
  fetchHospitals,
  socket
};

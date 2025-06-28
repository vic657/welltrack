// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // Target Laravel API routes
});

// Add Authorization header with token from localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

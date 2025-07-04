// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Full backend API base
  withCredentials: true, // Only if you're using Sanctum with cookies
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

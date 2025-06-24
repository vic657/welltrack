import axios from "axios";

// Enable cross-site cookies
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// Pull the CSRF token from cookies and attach to all requests
axios.interceptors.request.use((config) => {
  const token = getCookie("XSRF-TOKEN");
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

// Helper to read cookie
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export default axios;

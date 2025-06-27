import { useState } from "react";
import axios from "../axios"; // Token-aware axios instance
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/login", form);

      // Store the token for future authenticated requests
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/profile");
    } catch (error) {
      alert("Login failed. Check your credentials.");
      console.error("Login error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold text-info">WellTrack</h1>
          <p className="text-light">Login to continue</p>
        </div>

        <div className="card bg-secondary text-white shadow p-4 border-0">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-info">Email</label>
              <input
                name="email"
                type="email"
                className="form-control bg-dark text-white border-0"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-info">Password</label>
              <input
                name="password"
                type="password"
                className="form-control bg-dark text-white border-0"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-info w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import axios from "../axios"; // Custom axios instance
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeButton from "../Components/HomeButton";


export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/register", form);

      const token = res.data.token;
      const user = res.data.user;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("Registered successfully!");

        // Redirect after successful registration
        navigate("/profile");
      } else {
        alert("Registered, but token missing.");
      }
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors) {
        alert(Object.values(errors).flat().join("\n"));
      } else {
        alert("Registration failed.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold text-info">WellTrack</h1>
          <p className="text-light">Create a new account</p>
        </div>

        <div className="card bg-secondary text-white shadow p-4 border-0">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-info">Name</label>
              <input
                name="name"
                type="text"
                className="form-control bg-dark text-white border-0"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-info">Email</label>
              <input
                name="email"
                type="email"
                className="form-control bg-dark text-white border-0"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-info">Password</label>
              <input
                name="password"
                type="password"
                className="form-control bg-dark text-white border-0"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-info">Confirm Password</label>
              <input
                name="password_confirmation"
                type="password"
                className="form-control bg-dark text-white border-0"
                value={form.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-info w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          {/*  Home Button */}
                    <HomeButton />
        </div>
      </div>
    </div>
  );
}


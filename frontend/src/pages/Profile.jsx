import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./profile.css";
import Navbar from "../Components/Navbar";
import Reminder from '../Components/Reminder';
import StreakTracker from '../Components/StreakTracker';
import CheckInHeatmap from "../Components/CheckInHeatmap";





export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    axios.get("/api/user")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Failed to fetch user", err);
        setUser(null);
      });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 border-bottom border-aqua d-flex justify-content-between">
        <a className="navbar-brand text-aqua fw-bold" href="/profile">WellTrack</a>

        <Navbar user={user} />

      </nav>

      <div className="container-fluid bg-dark text-white min-vh-100 py-5">
        <div className="container">
          <h2 className="text-aqua fw-bold mb-4">Welcome to Your Dashboard</h2>
          <div className="container py-4 text-white">
      <Reminder />
    </div>
    <StreakTracker />
          

         <div className="row mt-5 g-4">
  <div className="col-md-4">
    <Link to="/check-in" className="text-decoration-none">
      <div className="card bg-dark text-white border border-info p-4 h-100 shadow-sm hover-scale">
        <h5 className="text-info">Daily Health Check-ins</h5>
        <p className="text-light">Update your personal and health details securely.</p>
      </div>
    </Link>
  </div>

  <div className="col-md-4">
    <Link to="/weekly-trends" className="text-decoration-none">
      <div className="card bg-dark text-white border border-info p-4 h-100 shadow-sm hover-scale">
        <h5 className="text-info">Weekly Trends</h5>
        <p className="text-light">Monitor your health through visual charts.</p>
      </div>
    </Link>
  </div>

  <div className="col-md-4">
    <Link to="/weekly-summary" className="text-decoration-none">
      <div className="card bg-dark text-white border border-info p-4 h-100 shadow-sm hover-scale">
        <h5 className="text-info">Weekly Summary</h5>
        <p className="text-light">Visualize your wellness improvements over time.</p>
      </div>
    </Link>
  </div>
</div>
        </div>
      </div>

<CheckInHeatmap />


      <footer className="bg-black text-white text-center py-3 border-top border-aqua">
        &copy; {new Date().getFullYear()} vicmass. All rights reserved.
      </footer>
    </>
  );
}

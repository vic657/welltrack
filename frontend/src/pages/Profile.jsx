import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Navbar from "../Components/Navbar";


export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    axios.get("/user")
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
          

          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card bg-black border-aqua p-3 h-100">
                <h5 className="text-aqua">Profile Overview</h5>
                <p>Update your personal and health details securely.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-black border-aqua p-3 h-100">
                <h5 className="text-aqua">Messages</h5>
                <p>View and respond to messages from staff.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-black border-aqua p-3 h-100">
                <h5 className="text-aqua">Progress Tracker</h5>
                <p>Visualize your wellness improvements over time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white text-center py-3 border-top border-aqua">
        &copy; {new Date().getFullYear()} WellTrack. All rights reserved.
      </footer>
    </>
  );
}

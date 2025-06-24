import { useEffect, useState } from "react";
import axios from "../axios";
import "./profile.css";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/user")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Not logged in", err));
  }, []);

  return (
    <>
      {/* Navbar without Login/Register */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 border-bottom border-aqua">
        <a className="navbar-brand text-aqua fw-bold" href="#">WellTrack</a>
      </nav>

      {/* User Profile Info */}
      <div className="container-fluid bg-dark text-white min-vh-100 py-5">
        <div className="container">
          <h2 className="text-aqua fw-bold mb-4">Welcome to Your Dashboard</h2>
          {user ? (
            <div className="card bg-black border-aqua text-white p-4 mb-4">
              <h5 className="text-aqua">User Information</h5>
              <pre className="text-light">{JSON.stringify(user, null, 2)}</pre>
            </div>
          ) : (
            <div className="alert alert-warning bg-black border-warning text-warning">
              User not logged in.
            </div>
          )}

          {/* Dashboard Features */}
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

      {/* Footer */}
      <footer className="bg-black text-white text-center py-3 border-top border-aqua">
        &copy; {new Date().getFullYear()} WellTrack. All rights reserved.
      </footer>
    </>
  );
}

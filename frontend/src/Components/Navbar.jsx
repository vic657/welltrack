import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 border-bottom border-aqua d-flex justify-content-between">

      {user && (
        <Dropdown align="end">
          <Dropdown.Toggle variant="outline-info" id="dropdown-user" className="d-flex align-items-center gap-2">
            <FaUserCircle size={22} />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-dark bg-dark text-white">
            <div className="px-3 py-2 border-bottom border-secondary">
              <div className="fw-bold">{user.name}</div>
              <div className="small text-muted">{user.email}</div>
            </div>
            <Dropdown.Item onClick={handleLogout} className="text-danger">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </nav>
  );
}

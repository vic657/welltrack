import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center p-4" style={{ maxWidth: "600px" }}>
        <h1 className="fw-bold text-info mb-3">Welcome to WellTrack</h1>
        <p className="lead mb-4">
          Monitor your mental and physical well-being with WellTrack — your smart health companion.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/register" className="btn btn-info px-4">
            Register
          </Link>
          <Link to="/login" className="btn btn-outline-info px-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

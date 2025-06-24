import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root paths*/}
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/profile" element={<Profile />}/>
      </Routes>
    </Router>
  );
}

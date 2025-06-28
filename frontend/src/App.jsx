import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import DailyCheckIn from './pages/DailyCheckIn'; 
import WeeklyTrends from './pages/WeeklyTrends';
import MotivationalTips from './pages/MotivationalTips';
import WeeklySummary from './pages/WeeklySummary';






export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root paths*/}
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check-in" element={<DailyCheckIn />} />
        <Route path="/weekly-trends" element={<WeeklyTrends />} />
        <Route path="/tips" element={<MotivationalTips />} />
        <Route path="/weekly-summary" element={<WeeklySummary />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

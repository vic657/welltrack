import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import BackButton from "../Components/BackButton";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyTrends() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/daily-logs/week")
      .then((res) => {
        // Log for debugging
        console.log("Logs response:", res.data);

        // Handle different response formats gracefully
        if (Array.isArray(res.data)) {
          setLogs(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setLogs(res.data.data);
        } else {
          console.warn("Unexpected response format:", res.data);
          setLogs([]); // Fallback to empty array
        }
      })
      .catch((err) => console.error("Error fetching logs", err));
  }, []);

  const moodToScore = (mood) => {
    if (mood === "😀") return 3;
    if (mood === "😐") return 2;
    if (mood === "😞") return 1;
    return 0;
  };

  const chartData = Array.isArray(logs)
    ? logs.map((log) => ({
        ...log,
        mood_score: moodToScore(log.mood),
      }))
    : [];

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4 text-info">Weekly Health Trends</h2>

      {/* Sleep Hours Chart */}
      <div className="mb-5">
        <h5 className="text-light">Sleep Hours</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#555" />
            <Line type="monotone" dataKey="sleep_hours" stroke="#00d4ff" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Water Intake Chart */}
      <div className="mb-5">
        <h5 className="text-light">Water Intake (cups)</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#555" />
            <Line type="monotone" dataKey="water_intake" stroke="#66ff66" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Mood Score Chart */}
      <div className="mb-5">
        <h5 className="text-light">Mood Score</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 3]} />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#555" />
            <Line type="monotone" dataKey="mood_score" stroke="#ff9999" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <BackButton />
    </div>
  );
}

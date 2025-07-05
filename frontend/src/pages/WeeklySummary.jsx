import { useEffect, useState } from "react";
import axios from "../axios";
import BackButton from "../Components/BackButton";
import { Link } from "react-router-dom";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

export default function WeeklySummary() {
  const [logs, setLogs] = useState([]);
  const [tips, setTips] = useState([]);
  const [hasLog, setHasLog] = useState(null);

  useEffect(() => {
    axios.get("/api/daily-logs/week")
      .then(res => setLogs(res.data))
      .catch(err => console.error("Logs fetch error", err));

    axios.get("/api/weekly-tips")
      .then(res => setTips(res.data.tips))
      .catch(err => console.error("Tips fetch error", err));

    axios.get("/api/daily-log/check-today")
      .then(res => setHasLog(res.data.hasLog))
      .catch(err => console.error("Reminder check error", err));
  }, []);

  const moodToScore = (m) => m === "😀" ? 3 : m === "😐" ? 2 : m === "😞" ? 1 : 0;
  const chartData = logs.map(log => ({
    ...log,
    mood_score: moodToScore(log.mood),
  }));

  const average = (key) => {
    const values = chartData.map(log => parseFloat(log[key])).filter(val => !isNaN(val));
    if (!values.length) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-info mb-5 fw-bold"> Weekly Wellness Summary</h2>

      {hasLog === false && (
        <div className="alert alert-warning fw-semibold shadow-sm text-center">
          🔔 You haven’t checked in today. Keep your wellness streak going !
        </div>
      )}

      {/* Summary Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow h-100">
            <div className="card-body text-center">
              <h5 className="card-title">😴 Avg Sleep</h5>
              <p className="display-6">{average("sleep_hours")} hrs</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow h-100">
            <div className="card-body text-center">
              <h5 className="card-title">💧 Avg Water</h5>
              <p className="display-6">{average("water_intake")} cups</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow h-100">
            <div className="card-body text-center">
              <h5 className="card-title">🙂 Avg Mood</h5>
              <p className="display-6">{average("mood_score")} / 3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mb-5">
        <div className="card bg-secondary text-white shadow mb-4">
          <div className="card-header fw-semibold">😴 Sleep Hours</div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#333" />
                <Line type="monotone" dataKey="sleep_hours" stroke="#00d4ff" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card bg-secondary text-white shadow mb-4">
          <div className="card-header fw-semibold">💧 Water Intake</div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#333" />
                <Line type="monotone" dataKey="water_intake" stroke="#66ff66" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card bg-secondary text-white shadow mb-4">
          <div className="card-header fw-semibold">🙂 Mood Score</div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 3]} />
                <Tooltip />
                <CartesianGrid stroke="#333" />
                <Line type="monotone" dataKey="mood_score" stroke="#ff9999" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-info text-dark shadow mt-5">
        <div className="card-header fw-bold">💡 Motivational Tips</div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {tips.map((tip, idx) => (
              <li key={idx} className="list-group-item bg-light text-dark">
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BackButton />

    </div>
  );
}

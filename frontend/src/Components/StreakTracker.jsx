import { useEffect, useState } from "react";
import axios from "../axios";

export default function StreakTracker() {
  const [streak, setStreak] = useState(null);
  const [lastBroken, setLastBroken] = useState(null);
  const [longestStreak, setLongestStreak] = useState(null);

  useEffect(() => {
    axios.get("/api/daily-log/streak")
      .then(res => {
        setStreak(res.data.streak);
        setLastBroken(res.data.last_broken);
        setLongestStreak(res.data.longest_streak);
      })
      .catch(err => console.error("Streak fetch error", err));
  }, []);

  const getBadge = () => {
    if (streak >= 14) return { label: " Diamond Streak", color: "#00d1b2" };
    if (streak >= 7) return { label: " Gold Streak", color: "#ffc107" };
    if (streak >= 4) return { label: " Silver Streak", color: "#adb5bd" };
    if (streak >= 1) return { label: " Bronze Streak", color: "#cd7f32" };
    return null;
  };

  if (streak === null) return null;

  const badge = getBadge();
  const progress = Math.min((streak / 14) * 100, 100);

  return (
    <div className="bg-dark text-white rounded shadow p-4 mt-4">
      <h5 className="text-info text-center mb-3">🔥 Streak Tracker</h5>

      {streak > 0 ? (
        <>
          <p className="text-center mb-2">
            You're on a <strong className="text-success">{streak}-day</strong> streak!
          </p>

          <div className="text-center mb-3">
            <span
              className="badge rounded-pill px-3 py-2"
              style={{ backgroundColor: badge.color }}
            >
              {badge.label}
            </span>
          </div>

          <div className="progress mb-2" style={{ height: "10px", backgroundColor: "#444" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progress}%`,
                backgroundColor: "#28a745",
              }}
              aria-valuenow={streak}
              aria-valuemin="0"
              aria-valuemax="14"
            ></div>
          </div>

          <p className="text-muted small text-center mb-2">
            Progress to <strong>14-day</strong> streak
          </p>

          <p className="text-light text-center">
            🏆 Your longest streak: <strong>{longestStreak} days</strong>
          </p>
        </>
      ) : (
        <p className="text-center text-warning">
          🧊 No current streak. Last check-in was on <strong>{lastBroken}</strong>
        </p>
      )}
    </div>
  );
}

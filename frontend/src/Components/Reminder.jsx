import { useEffect, useState } from "react";
import axios from "../axios";

export default function Reminder() {
  const [hasLog, setHasLog] = useState(null);

  useEffect(() => {
    axios.get("/daily-log/check-today")
      .then(res => setHasLog(res.data.hasLog))
      .catch(err => console.error("Reminder check failed", err));
  }, []);

  if (hasLog === null) return null; // still loading

  return (
    !hasLog && (
      <div className="alert alert-warning text-dark fw-bold shadow">
        🔔 You haven’t checked in today. Keep your wellness streak going !
      </div>
    )
  );
}

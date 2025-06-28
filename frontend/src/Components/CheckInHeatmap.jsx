import React, { useEffect, useState } from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, format } from "date-fns";
import axios from "../axios";

export default function CheckInHeatmap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/daily-log/heatmap")
      .then(res => setData(res.data))
      .catch(err => console.error("Heatmap fetch error", err));
  }, []);

  const today = new Date();
  const startDate = subDays(today, 180); // Last 6 months

  return (
    <div className="card bg-dark text-white mt-4 p-3 shadow">
      <h5 className="text-info mb-3">Check-In History</h5>
      <Heatmap
        startDate={startDate}
        endDate={today}
        values={data}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count >= 3) return "color-gitlab-4";
          if (value.count === 2) return "color-gitlab-3";
          if (value.count === 1) return "color-gitlab-2";
          return "color-gitlab-1";
        }}
        tooltipDataAttrs={(value) =>
          value.date
            ? { "data-tip": `${value.date}: Check-in logged` }
            : {}
        }
        showWeekdayLabels
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";
import axios from "../axios";

export default function CheckInHeatmap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/daily-log/heatmap")
      .then((res) => setData(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Heatmap fetch error", err);
        setData([]);
      });
  }, []);

  const today = new Date();
  const startDate = subDays(today, 180); // Last 6 months

  const isEmpty = !Array.isArray(data) || data.length === 0;

  return (
    <div className="card bg-dark text-white mt-4 p-3 shadow">
      <h5 className="text-info mb-3">Check-In History</h5>

      {!isEmpty ? (
        <Heatmap
          startDate={startDate}
          endDate={today}
          values={data}
          classForValue={(value) => {
            if (!value || typeof value.count !== "number") return "color-empty";
            if (value.count >= 3) return "color-gitlab-4";
            if (value.count === 2) return "color-gitlab-3";
            if (value.count === 1) return "color-gitlab-2";
            return "color-gitlab-1";
          }}
          tooltipDataAttrs={(value) =>
            value?.date
              ? { "data-tip": `${value.date}: Check-in logged` }
              : {}
          }
          showWeekdayLabels
        />
      ) : (
        <p className="text-muted text-center">
          No check-ins yet—your heatmap will light up once you start logging!
        </p>
      )}
    </div>
  );
}

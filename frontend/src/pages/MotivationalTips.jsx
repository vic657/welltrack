import { useEffect, useState } from "react";
import axios from "../axios";

export default function MotivationalTips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axios.get("/api/weekly-tips")
      .then(res => setTips(res.data.tips))
      .catch(err => console.error("Failed to fetch tips", err));
  }, []);

  return (
    <div className="container py-5 text-white">
      <h2 className="text-info mb-4"> Motivational Health Tips</h2>
      {tips.length === 0 ? (
        <p>Loading tips...</p>
      ) : (
        <ul className="list-group">
          {tips.map((tip, idx) => (
            <li key={idx} className="list-group-item bg-dark text-white border-info mb-2">
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useState } from "react";
import axios from "../axios";
import BackButton from "../Components/BackButton";
import { Link } from "react-router-dom";


export default function DailyCheckIn() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    mood: "",
    sleep_hours: "",
    water_intake: "",
    food: "",
    symptoms: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("/daily-log", form);
      setMessage("Check-in submitted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit check-in.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark text-white d-flex align-items-center justify-content-center">
      <div className="container" style={{ maxWidth: "600px" }}>
        <h2 className="text-info text-center mb-4">Daily Health Check-In</h2>

        <form className="card bg-secondary p-4 border-0 shadow" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Mood</label>
            <select name="mood" className="form-control" value={form.mood} onChange={handleChange}>
              <option value="">Select mood</option>
              <option value="😀">😀 Happy</option>
              <option value="😐">😐 Neutral</option>
              <option value="😞">😞 Sad</option>
              <option value="😫">😫 Tired</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Sleep Hours</label>
            <input
              type="number"
              name="sleep_hours"
              className="form-control"
              value={form.sleep_hours}
              onChange={handleChange}
              placeholder="hours of sleep"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Water Intake (glasses)</label>
            <input
              type="number"
              name="water_intake"
              className="form-control"
              value={form.water_intake}
              onChange={handleChange}
              placeholder="number of cups"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Food</label>
            <textarea
              name="food"
              className="form-control"
              value={form.food}
              onChange={handleChange}
              placeholder="What did you eat today?"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Symptoms</label>
            <textarea
              name="symptoms"
              className="form-control"
              value={form.symptoms}
              onChange={handleChange}
              placeholder="Any symptoms today?"
            />
          </div>

          <button className="btn btn-info w-100" disabled={loading}>
            {loading ? "Submitting..." : "Submit Check-In"}
          </button>
        </form>
        <BackButton />


        {message && (
          <div className="mt-3 text-center">
            <small className="text-warning">{message}</small>
          </div>
        )}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-outline-light rounded-pill px-4 py-2 mt-3 shadow-sm"
    >
     Back
    </button>
  );
}

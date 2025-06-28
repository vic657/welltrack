import { Link } from "react-router-dom";

export default function HomeButton() {
  return (
    <div className="mt-4">
      <Link to="/" className="btn btn-outline-info rounded-pill px-4 py-2 shadow-sm hover-glow">
        Back to Home
      </Link>
    </div>
  );
}

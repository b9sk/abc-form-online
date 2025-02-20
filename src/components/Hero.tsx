import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">ABC Form Tracker</h1>
      <p className="text-lg mb-6">
        Track your thoughts and emotions using Cognitive Behavioral Therapy’s
        ABC model.
      </p>
      <button
        onClick={() => navigate("/forms/add")}
        className="bg-blue-500 text-white p-3 rounded"
      >
        Start Tracking
      </button>
    </div>
  );
}
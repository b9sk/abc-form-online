import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EntryList from "../components/EntryList";
import { formRepository } from "../db/repository";
import { seedDatabase } from "../db/seed";

export default function FormList() {
  const [entries, setEntries] = useState([]); // Rename for clarity
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const hasSeeded = useRef(false);

  useEffect(() => {
    if (hasSeeded.current) return;
    hasSeeded.current = true;

    const loadData = async () => {
      await seedDatabase(); // Seed the DB first
      const initialEntries = await formRepository.getPaginatedForms(0, 20); // Then fetch
      // @ts-ignore
      setEntries(initialEntries);
      setLoading(false); // Update UI when done
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>; // Show loading indicator
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Previous Entries</h1>
        <button
          onClick={() => navigate("/forms/add")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          New Entry
        </button>
      </div>
      <EntryList initialEntries={entries} />
    </div>
  );
}
import { useEffect, useState, useRef } from "react"; // Add useRef
import { useNavigate } from "react-router-dom";
import EntryList from "../components/EntryList";
import { formRepository } from "../db/repository";
import { seedDatabase } from "../db/seed";

export default function FormList() {
  const [initialEntries, setInitialEntries] = useState([]);
  const navigate = useNavigate();
  const hasSeeded = useRef(false); // Track if seeding has run

  useEffect(() => {
    if (hasSeeded.current) return; // Skip if already seeded in this session
    hasSeeded.current = true;

    seedDatabase().then(() =>
      // @ts-ignore
      formRepository.getPaginatedForms(0, 20).then(setInitialEntries)
    );
  }, []);

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
      <EntryList initialEntries={initialEntries} />
    </div>
  );
}
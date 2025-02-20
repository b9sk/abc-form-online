import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ABCForm } from "../types";
import { formRepository } from "../db/repository";

interface EntryListProps {
  initialEntries: ABCForm[];
}

export default function EntryList({ initialEntries }: EntryListProps) {
  const [entries, setEntries] = useState<ABCForm[]>(initialEntries);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const loadMoreEntries = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newEntries = await formRepository.getPaginatedForms(
      entries.length,
      20
    );
    setEntries((prev) => [...prev, ...newEntries]);
    setHasMore(newEntries.length === 20);
    setLoading(false);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMoreEntries();
      },
      { threshold: 1.0 }
    );
    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);
    return () => observer.current?.disconnect();
  }, [entries]);

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border p-4 rounded">
          <div
            className="cursor-pointer"
            onClick={() =>
              setExpanded(expanded === entry.id ? null : entry.id!)
            }
          >
            <p className="text-sm">
              <strong>{new Date(entry.dateTime).toLocaleString()}</strong> -{" "}
              {entry.activationEvent}
            </p>
          </div>
          {expanded === entry.id && (
            <div className="mt-2 text-sm">
              <p>
                <strong>Emotions:</strong> {entry.emotions}
              </p>
              <p>
                <strong>Actions:</strong> {entry.actions}
              </p>
              <p>
                <strong>Beliefs:</strong> {entry.beliefs}
              </p>
              <p>
                <strong>Thinking Error:</strong> {entry.thinkingError}
              </p>
            </div>
          )}
          <button
            onClick={() => navigate(`/forms/${entry.id}`)}
            className="mt-2 bg-green-500 text-white p-1 rounded text-sm"
          >
            Edit
          </button>
        </div>
      ))}
      {loading && <p className="text-center">Loading more...</p>}
      {hasMore && <div ref={loadMoreRef} />}
    </div>
  );
}
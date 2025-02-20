import { useState, useEffect } from "react";
import type { ABCForm } from "../types";
import { formRepository } from "../db/repository";

interface ABCFormProps {
  initialForm?: ABCForm;
  onSubmit: (form: ABCForm) => void;
}

export default function ABCForm({ initialForm, onSubmit }: ABCFormProps) {
  const [form, setForm] = useState<ABCForm>(
    initialForm || {
      dateTime: "",
      emotions: "",
      actions: "",
      activationEvent: "",
      beliefs: "",
      thinkingError: "",
    }
  );
  const [thinkingErrors, setThinkingErrors] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    formRepository.getThinkingErrors().then((errors) =>
      setThinkingErrors(errors.map((e) => e.name))
    );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.dateTime) {
      setError("Date & Time is required");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block font-medium">Date & Time</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={form.dateTime}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Emotions</label>
        <input
          type="text"
          name="emotions"
          value={form.emotions}
          onChange={handleChange}
          placeholder="Write down your emotions"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Actions</label>
        <textarea
          name="actions"
          value={form.actions}
          onChange={handleChange}
          placeholder="Write down your actions"
          rows={3}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Activation Event</label>
        <textarea
          name="activationEvent"
          value={form.activationEvent}
          onChange={handleChange}
          placeholder="What triggered your feelings?"
          rows={3}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Beliefs</label>
        <textarea
          name="beliefs"
          value={form.beliefs}
          onChange={handleChange}
          placeholder="Thoughts and beliefs in your mind"
          rows={3}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Thinking Error</label>
        <select
          name="thinkingError"
          value={form.thinkingError}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select a thinking error</option>
          {thinkingErrors.map((error) => (
            <option key={error} value={error}>
              {error}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {initialForm ? "Update" : "Save"}
      </button>
    </form>
  );
}
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ABCForm from "../components/ABCForm";
import { formRepository } from "../db/repository";

export default function FormEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      formRepository.getFormById(Number(id)).then(setForm);
    }
  }, [id]);

  const handleSubmit = async (updatedForm: any) => {
    if (id) {
      await formRepository.updateForm(Number(id), updatedForm);
      navigate("/forms");
    }
  };

  const handleDelete = async () => {
    if (id) {
      await formRepository.deleteForm(Number(id));
      navigate("/forms");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit ABC Entry</h1>
      <ABCForm initialForm={form} onSubmit={handleSubmit} />
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Delete Entry
      </button>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <p>Are you sure you want to delete this entry?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
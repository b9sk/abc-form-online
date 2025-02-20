import { useNavigate } from "react-router-dom";
import ABCForm from "../components/ABCForm";
import { formRepository } from "../db/repository";

export default function FormAdd() {
  const navigate = useNavigate();

  const handleSubmit = async (form: any) => {
    await formRepository.addForm(form);
    navigate("/forms");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New ABC Entry</h1>
      <ABCForm onSubmit={handleSubmit} />
    </div>
  );
}
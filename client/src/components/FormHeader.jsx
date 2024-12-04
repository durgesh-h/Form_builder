import React from "react";
import { useFormStore } from "../store/formStore";

export function FormHeader() {
  const { currentForm, setCurrentForm } = useFormStore();

  const handleChange = (field, value) => {
    setCurrentForm({
      ...currentForm,
      [field]: value,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <div className="flex-1 mb-4 sm:mb-0">
        <input
          type="text"
          value={currentForm?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Form Title"
          className="text-2xl font-bold w-full mb-2 bg-transparent border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
        />
      </div>

      <div className="flex-1">
        <textarea
          value={currentForm?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Form Description"
          className="text-gray-600 w-full resize-none bg-transparent border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
          rows={2}
        />
      </div>
    </div>
  );
}

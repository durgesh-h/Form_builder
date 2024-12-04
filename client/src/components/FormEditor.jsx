import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useFormStore } from "../store/formStore";
import { QuestionCard } from "./QuestionCard";
import { FormHeader } from "./FormHeader";
import { AddQuestionButtons } from "./AddQuestionButtons";

export function FormEditor() {
  const { currentForm, setCurrentForm } = useFormStore();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [savedFormId, setSavedFormId] = useState(null);

  const handleSave = async () => {
    if (!currentForm.title || !currentForm.description) {
      setError("Please provide a title and description for the form");
      return;
    }

    if (currentForm.questions.length === 0) {
      setError("Please add at least one question to the form");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/forms`,
        currentForm
      );
      setSavedFormId(response.data._id);
      setSaving(false);
    } catch (err) {
      setError("Failed to save form. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Back Link */}
      <div className="mb-4">
        <Link
          to="/"
          className="text-gray-800 hover:text-gray-600 inline-flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Forms
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header and Save Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6">
          <FormHeader />
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-360 sm:w-auto px-4 py-2 rounded-md flex items-center gap-2 ${
              saving
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            } transition-colors`}
          >
            <Save size={20} />
            {saving ? "Saving..." : "Save Form"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 border border-red-300 text-red-600 rounded-md">
            {error} or Reduce images size!
            <p className="text-xs">If form not saved.. save without images!</p>
          </div>
        )}

        {/* Success Message */}
        {savedFormId && (
          <div className="mb-4 p-3 border border-green-300 text-green-600 rounded-md">
            Form saved successfully!{" "}
            <Link
              to={`/form/${savedFormId}`}
              className="text-green-800 hover:text-green-700 underline"
            >
              View form
            </Link>
          </div>
        )}

        {/* Form Header Image */}
        {currentForm?.headerImage && (
          <div className="mb-6">
            <img
              src={currentForm.headerImage}
              alt="Form header"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {currentForm?.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        {/* Add Question Button */}
        <div className="mt-6">
          <AddQuestionButtons />
        </div>
      </div>
    </div>
  );
}

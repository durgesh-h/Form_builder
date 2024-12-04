import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ExternalLink, Trash2, Copy } from "lucide-react";
import axios from "axios";

export function FormList() {
  const [forms, setForms] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/forms`
      );
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/forms/${id}`);
      fetchForms();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const copyToClipboard = async (id) => {
    const url = `${window.location.origin}/form/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">My Forms</h1>
        <Link
          to="/create"
          className="px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <Plus size={20} />
          Create Form
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500 hover:border-blue-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 truncate">
                  {form.title}
                </h2>
                <p className="text-gray-500 mt-1 text-sm">{form.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(form._id)}
                  className="p-2 text-gray-500 hover:text-gray-700 relative rounded-full hover:bg-gray-200"
                  title="Copy form link"
                >
                  <Copy size={20} />
                  {copySuccess === form._id && (
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-green-600 font-semibold bg-white p-1 rounded">
                      Link copied!
                    </span>
                  )}
                </button>
                <Link
                  to={`/form/${form._id}`}
                  className="p-2 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100"
                  title="Open form"
                >
                  <ExternalLink size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(form._id)}
                  className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100"
                  title="Delete form"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {forms.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">No forms created yet.</p>
            <Link
              to="/create"
              className="text-blue-600 hover:text-blue-700 mt-6 inline-flex items-center gap-2 text-lg"
            >
              <Plus size={20} />
              Create your first form
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

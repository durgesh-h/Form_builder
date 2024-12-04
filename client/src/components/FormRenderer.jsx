import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CategorizeRenderer } from "./renderers/CategorizeRenderer";
import ClozeRenderer from "./renderers/ClozeRenderer";
import { ComprehensionRenderer } from "./renderers/ComprehensionRenderer";

export function FormRenderer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/forms/${id}`
      );
      setForm(response.data);
      initializeAnswers(response.data.questions);
      setLoading(false);
    } catch (error) {
      setError("Failed to load form. Please try again later.");
      setLoading(false);
    }
  };

  const initializeAnswers = (questions) => {
    const initialAnswers = {};
    questions.forEach((question) => {
      switch (question.type) {
        case "categorize":
          initialAnswers[question.id] = {
            categories: {},
          };
          break;
        case "cloze":
          initialAnswers[question.id] = {
            blanks: Array(question.blanks.length).fill(""),
          };
          break;
        case "comprehension":
          initialAnswers[question.id] = {
            answers: question.subQuestions.reduce(
              (acc, sq) => ({ ...acc, [sq.id]: "" }),
              {}
            ),
          };
          break;
      }
    });
    setAnswers(initialAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/forms/${id}/submit`,
        {
          answers,
        }
      );
      navigate("/success");
    } catch (error) {
      setError("Failed to submit form. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!form) return null;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-100 min-h-screen">
      <div className="bg-white bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center  mb-4">
          {form.title}
        </h1>
        <p className="text-blue-600 text-center text-lg">{form.description}</p>

        {form.headerImage && (
          <img
            src={form.headerImage}
            alt="Form header"
            className="w-full h-56 object-cover rounded-lg shadow-md mb-6"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {form.questions.map((question) => (
            <div
              key={question.id}
              className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 bg-gray-100"
            >
              <h2 className="text-xl font-semibold text-orange-600 mb-4">
                {question.title}
              </h2>
              {question.imageUrl && (
                <img
                  src={question.imageUrl}
                  alt="Question"
                  className="w-full h-40 object-cover rounded-lg shadow-sm mb-4"
                />
              )}

              {/* Conditional Renderers */}
              {question.type === "categorize" && (
                <CategorizeRenderer
                  question={question}
                  answers={answers[question.id]}
                  setAnswers={(newAnswers) =>
                    setAnswers({ ...answers, [question.id]: newAnswers })
                  }
                />
              )}
              {question.type === "cloze" && (
                <ClozeRenderer
                  question={question}
                  answers={answers[question.id]}
                  setAnswers={(newAnswers) =>
                    setAnswers({ ...answers, [question.id]: newAnswers })
                  }
                />
              )}
              {question.type === "comprehension" && (
                <ComprehensionRenderer
                  question={question}
                  answers={answers[question.id]}
                  setAnswers={(newAnswers) =>
                    setAnswers({ ...answers, [question.id]: newAnswers })
                  }
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

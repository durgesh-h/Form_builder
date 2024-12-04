import React from "react";

export function ComprehensionRenderer({ question, answers, setAnswers }) {
  const handleAnswerChange = (subQuestionId, value) => {
    setAnswers({
      ...answers,
      answers: {
        ...answers.answers,
        [subQuestionId]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="prose max-w-none bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-lg leading-relaxed text-gray-700">
          {question.passage}
        </p>
      </div>

      <div className="space-y-6">
        {question.subQuestions.map((subQuestion) => (
          <div key={subQuestion.id} className="space-y-3">
            <p className="font-medium text-gray-800">{subQuestion.question}</p>
            <div className="space-y-2">
              {subQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${subQuestion.id}`}
                    value={option}
                    checked={answers[subQuestion.id] === option}
                    onChange={() => handleAnswerChange(subQuestion.id, option)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

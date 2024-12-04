import React from 'react';
import { Plus } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { QuestionCard } from './QuestionCard';
import { FormHeader } from './FormHeader';
import { AddQuestionButtons } from './AddQuestionButtons';

export const FormEditor: React.FC = () => {
  const { currentForm } = useFormStore();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <FormHeader />
        
        {currentForm?.headerImage && (
          <img
            src={currentForm.headerImage}
            alt="Form header"
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
        )}

        <div className="space-y-6">
          {currentForm?.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        <AddQuestionButtons />
      </div>
    </div>
  );
};
import React from 'react';
import { ComprehensionQuestion } from '../../types/form';

interface ComprehensionContentProps {
  question: ComprehensionQuestion;
}

export const ComprehensionContent: React.FC<ComprehensionContentProps> = ({ question }) => {
  return (
    <div className="mt-4">
      <p className="text-gray-600">Comprehension content coming soon...</p>
    </div>
  );
};
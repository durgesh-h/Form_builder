import React from 'react';
import { CategorizeQuestion } from '../../types/form';

interface CategorizeContentProps {
  question: CategorizeQuestion;
}

export const CategorizeContent: React.FC<CategorizeContentProps> = ({ question }) => {
  return (
    <div className="mt-4">
      <p className="text-gray-600">Categorize content coming soon...</p>
    </div>
  );
};
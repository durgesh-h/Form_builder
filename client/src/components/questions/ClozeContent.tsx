import React from 'react';
import { ClozeQuestion } from '../../types/form';

interface ClozeContentProps {
  question: ClozeQuestion;
}

export const ClozeContent: React.FC<ClozeContentProps> = ({ question }) => {
  return (
    <div className="mt-4">
      <p className="text-gray-600">Cloze content coming soon...</p>
    </div>
  );
};
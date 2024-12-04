import React from 'react';
import { Question } from '../../types/form';
import { CategorizeContent } from './CategorizeContent';
import { ClozeContent } from './ClozeContent';
import { ComprehensionContent } from './ComprehensionContent';

interface QuestionTypeContentProps {
  question: Question;
}

export const QuestionTypeContent: React.FC<QuestionTypeContentProps> = ({ question }) => {
  switch (question.type) {
    case 'categorize':
      return <CategorizeContent question={question} />;
    case 'cloze':
      return <ClozeContent question={question} />;
    case 'comprehension':
      return <ComprehensionContent question={question} />;
    default:
      return null;
  }
};
export interface Question {
  id: string;
  type: 'categorize' | 'cloze' | 'comprehension';
  title: string;
  imageUrl?: string;
}

export interface CategorizeQuestion extends Question {
  type: 'categorize';
  categories: string[];
  items: {
    id: string;
    content: string;
    category: string;
  }[];
}

export interface ClozeQuestion extends Question {
  type: 'cloze';
  text: string;
  blanks: string[];
}

export interface ComprehensionQuestion extends Question {
  type: 'comprehension';
  passage: string;
  subQuestions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface Form {
  id: string;
  title: string;
  description: string;
  headerImage?: string;
  questions: (CategorizeQuestion | ClozeQuestion | ComprehensionQuestion)[];
}
import { create } from 'zustand';
import { Form, Question } from '../types/form';

interface FormState {
  currentForm: Form | null;
  setCurrentForm: (form: Form) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (questionId: string, question: Question) => void;
  removeQuestion: (questionId: string) => void;
}

const initialForm: Form = {
  id: crypto.randomUUID(),
  title: 'Untitled Form',
  description: 'Form description',
  questions: [],
};

export const useFormStore = create<FormState>((set) => ({
  currentForm: initialForm,
  setCurrentForm: (form) => set({ currentForm: form }),
  addQuestion: (question) =>
    set((state) => ({
      currentForm: state.currentForm
        ? {
            ...state.currentForm,
            questions: [...state.currentForm.questions, question],
          }
        : null,
    })),
  updateQuestion: (questionId, question) =>
    set((state) => ({
      currentForm: state.currentForm
        ? {
            ...state.currentForm,
            questions: state.currentForm.questions.map((q) =>
              q.id === questionId ? question : q
            ),
          }
        : null,
    })),
  removeQuestion: (questionId) =>
    set((state) => ({
      currentForm: state.currentForm
        ? {
            ...state.currentForm,
            questions: state.currentForm.questions.filter((q) => q.id !== questionId),
          }
        : null,
    })),
}));
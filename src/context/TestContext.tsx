'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ResultType, calculateResult } from '@/data/results';
import { Book, getRandomBook } from '@/data/books';

interface TestContextType {
  answers: Array<'A' | 'B' | 'C' | 'D'>;
  currentQuestion: number;
  result: ResultType | null;
  recommendedBook: Book | null;
  isLoading: boolean;
  setAnswer: (index: number, answer: 'A' | 'B' | 'C' | 'D') => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateAndSetResult: () => Promise<void>;
  resetTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Array<'A' | 'B' | 'C' | 'D'>>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState<ResultType | null>(null);
  const [recommendedBook, setRecommendedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedResult = localStorage.getItem('moodshelf-result');
    const savedBook = localStorage.getItem('moodshelf-book');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
    if (savedBook) {
      setRecommendedBook(JSON.parse(savedBook));
    }
  }, []);

  const setAnswer = (index: number, answer: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const calculateAndSetResult = async () => {
    setIsLoading(true);

    // 로딩 효과를 위한 딜레이 (1.5초)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const calculatedResult = calculateResult(answers);
    const book = getRandomBook(calculatedResult.type);

    setResult(calculatedResult);
    setRecommendedBook(book);

    localStorage.setItem('moodshelf-result', JSON.stringify(calculatedResult));
    localStorage.setItem('moodshelf-book', JSON.stringify(book));

    setIsLoading(false);
  };

  const resetTest = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setResult(null);
    setRecommendedBook(null);
    setIsLoading(false);
    localStorage.removeItem('moodshelf-result');
    localStorage.removeItem('moodshelf-book');
  };

  return (
    <TestContext.Provider
      value={{
        answers,
        currentQuestion,
        result,
        recommendedBook,
        isLoading,
        setAnswer,
        nextQuestion,
        prevQuestion,
        calculateAndSetResult,
        resetTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}

'use client';

import { useRouter } from 'next/navigation';
import { useTest } from '@/context/TestContext';
import { questions } from '@/data/questions';
import ProgressBar from '@/components/ProgressBar';

export default function TestPage() {
  const router = useRouter();
  const {
    answers,
    currentQuestion,
    setAnswer,
    nextQuestion,
    prevQuestion,
    calculateAndSetResult,
  } = useTest();

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswered = answers[currentQuestion] !== undefined;

  const handleSelect = (type: 'A' | 'B' | 'C' | 'D') => {
    setAnswer(currentQuestion, type);
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      router.push('/result');
      calculateAndSetResult();
    } else {
      nextQuestion();
    }
  };

  const handlePrev = () => {
    prevQuestion();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-xl relative z-10">
        <ProgressBar current={currentQuestion} total={questions.length} />

        <div className="card p-8 animate-fade-in" key={currentQuestion}>
          {/* Question number badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold">
              Q{currentQuestion + 1}
            </span>
          </div>

          {/* Question text */}
          <h2 className="text-xl md:text-2xl font-semibold text-center leading-relaxed mb-10 text-white">
            {question.text}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            <button
              onClick={() => handleSelect(question.optionA.type)}
              className={`option-btn w-full p-5 text-left ${
                answers[currentQuestion] === question.optionA.type ? 'selected' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  answers[currentQuestion] === question.optionA.type
                    ? 'border-[var(--accent)] bg-[var(--accent)]'
                    : 'border-[var(--border)]'
                }`}>
                  {answers[currentQuestion] === question.optionA.type && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="text-[var(--text-primary)]">{question.optionA.text}</span>
              </div>
            </button>

            <button
              onClick={() => handleSelect(question.optionB.type)}
              className={`option-btn w-full p-5 text-left ${
                answers[currentQuestion] === question.optionB.type ? 'selected' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  answers[currentQuestion] === question.optionB.type
                    ? 'border-[var(--accent)] bg-[var(--accent)]'
                    : 'border-[var(--border)]'
                }`}>
                  {answers[currentQuestion] === question.optionB.type && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="text-[var(--text-primary)]">{question.optionB.text}</span>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="btn-secondary px-6 py-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className="btn-primary px-8 py-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLastQuestion ? '결과 보기' : '다음'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

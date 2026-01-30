'use client';

import { useEffect, useState } from 'react';

const loadingMessages = [
  '당신의 답변을 분석하고 있어요...',
  '마음에 맞는 책을 찾고 있어요...',
  '독서 유형을 계산하고 있어요...',
  '거의 다 됐어요!',
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Animated books */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg animate-bounce" style={{ animationDelay: '0ms' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg animate-bounce opacity-60 -translate-x-4" style={{ animationDelay: '150ms' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg animate-bounce opacity-40 translate-x-4" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Loading text */}
      <p className="text-[var(--text-secondary)] text-lg animate-pulse">
        {loadingMessages[messageIndex]}
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useTest } from '@/context/TestContext';
import BookCard from '@/components/BookCard';
import ShareButtons from '@/components/ShareButtons';
import LoadingScreen from '@/components/LoadingScreen';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function ResultPage() {
  const { result, recommendedBook, resetTest, isLoading } = useTest();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hasPlayedRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getTTSText = useCallback(() => {
    if (!result) return '';
    const bookInfo = recommendedBook
      ? `추천 도서는 ${recommendedBook.author}의 ${recommendedBook.title}입니다. ${recommendedBook.summary}`
      : '';
    return `당신의 독서 유형은 ${result.name}입니다. ${result.description}. 오늘의 한 문장: ${result.quote}. ${bookInfo}`;
  }, [result, recommendedBook]);

  const speak = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const text = getTTSText();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [getTTSText]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  useEffect(() => {
    if (result && !isLoading && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      const timer = setTimeout(() => {
        speak();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [result, isLoading, speak]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!result) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">🤔</div>
          <p className="text-[var(--text-secondary)] mb-6">결과를 찾을 수 없습니다.</p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full"
          >
            테스트 다시 하기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          style={{ background: result.color }}
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Result Card */}
        <div className="card p-8 mb-6 animate-fade-in">
          {/* Emoji & Type */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 text-5xl"
              style={{ background: `${result.color}20` }}
            >
              {result.emoji}
            </div>
            <p
              className="text-sm font-semibold mb-2 uppercase tracking-wider"
              style={{ color: result.color }}
            >
              Your Reading Type
            </p>
            <h1 className="text-3xl font-bold text-white mb-4">{result.name}</h1>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Strengths */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {result.strengths.map((strength) => (
              <span
                key={strength}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: `${result.color}15`,
                  color: result.color,
                }}
              >
                {strength}
              </span>
            ))}
          </div>

          {/* Quote */}
          <div className="relative p-6 rounded-2xl bg-[var(--bg-secondary)] mb-8">
            <div className="absolute -top-3 left-6 text-4xl opacity-30" style={{ color: result.color }}>
              "
            </div>
            <p className="text-lg font-medium text-white italic text-center">
              {result.quote}
            </p>
            <p className="text-sm text-[var(--text-muted)] text-center mt-2">
              오늘의 한 문장
            </p>
          </div>

          {/* TTS Controls */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-sm text-[var(--text-muted)]">음성 듣기</span>
            {isSpeaking ? (
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                </svg>
                <span className="text-sm">중지</span>
              </button>
            ) : (
              <button
                onClick={speak}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                <span className="text-sm">다시 듣기</span>
              </button>
            )}
          </div>

          {/* Share */}
          <ShareButtons title="Minjoo's Shelf" resultName={result.name} />
        </div>

        {/* Book Recommendation */}
        {recommendedBook && (
          <div className="mb-6 animate-fade-in stagger-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📚</span>
              <h2 className="text-lg font-semibold text-white">당신을 위한 추천 도서</h2>
            </div>
            <BookCard
              title={recommendedBook.title}
              author={recommendedBook.author}
              summary={recommendedBook.summary}
              coverImage={recommendedBook.coverImage}
              tags={recommendedBook.tags}
              isbn={recommendedBook.isbn}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 animate-fade-in stagger-3">
          <Link
            href="/"
            onClick={resetTest}
            className="btn-primary w-full text-center py-4 rounded-full font-semibold"
          >
            다시 테스트하기
          </Link>
          <Link
            href="/about"
            className="btn-secondary w-full text-center py-4 rounded-full"
          >
            서비스 소개
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--text-muted)] text-xs mt-8">
          Minjoo's Shelf - 300권 중 당신만을 위한 책
        </p>
      </div>
    </main>
  );
}

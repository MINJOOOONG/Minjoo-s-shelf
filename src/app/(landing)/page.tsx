'use client';

import Link from 'next/link';
import { useTest } from '@/context/TestContext';

export default function LandingPage() {
  const { resetTest } = useTest();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-lg relative z-10">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500 to-pink-500 mb-6 animate-float glow">
            <span className="text-5xl">📚</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-3 animate-fade-in stagger-1">
          <span className="gradient-text">Minjoo's Shelf</span>
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-4 animate-fade-in stagger-2">
          당신의 마음을 읽는 책장
        </p>

        {/* Description */}
        <p className="text-[var(--text-muted)] mb-10 leading-relaxed animate-fade-in stagger-3">
          지금 기분이 어떠세요?<br />
          5개의 질문으로 300권 중에서<br />
          딱 맞는 책을 추천해드릴게요.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in stagger-4">
          <Link
            href="/test"
            onClick={resetTest}
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg font-semibold"
          >
            테스트 시작하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-12 animate-fade-in stagger-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-sm text-[var(--text-muted)]">질문</p>
          </div>
          <div className="w-px bg-[var(--border)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">300</p>
            <p className="text-sm text-[var(--text-muted)]">권의 책</p>
          </div>
          <div className="w-px bg-[var(--border)]" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">1분</p>
            <p className="text-sm text-[var(--text-muted)]">소요</p>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-16 animate-fade-in stagger-4">
          <Link
            href="/about"
            className="text-[var(--text-muted)] text-sm hover:text-[var(--accent)] transition-colors"
          >
            서비스 소개 →
          </Link>
        </div>
      </div>
    </main>
  );
}

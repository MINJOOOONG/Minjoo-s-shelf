import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="card p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 mb-4">
              <span className="text-4xl">📚</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Minjoo's Shelf</h1>
            <p className="text-[var(--text-muted)]">당신의 마음을 읽는 책장</p>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-8">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Minjoo's Shelf는 간단한 심리테스트를 통해 오늘 당신의 기분과 성향에 맞는
              책을 추천해주는 서비스입니다.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              8개의 질문에 답하면 4가지 독서 유형 중 당신에게 맞는 유형을 분석하고,
              그에 맞는 책 한 권을 추천해드립니다.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)]">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm font-medium text-white">2분 완성</p>
              <p className="text-xs text-[var(--text-muted)]">빠른 테스트</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)]">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm font-medium text-white">4가지 유형</p>
              <p className="text-xs text-[var(--text-muted)]">정확한 분석</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)]">
              <div className="text-2xl mb-2">📖</div>
              <p className="text-sm font-medium text-white">맞춤 추천</p>
              <p className="text-xs text-[var(--text-muted)]">취향저격 책</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)]">
              <div className="text-2xl mb-2">🛒</div>
              <p className="text-sm font-medium text-white">바로 구매</p>
              <p className="text-xs text-[var(--text-muted)]">서점 연결</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <h2 className="font-semibold text-amber-400 mb-1">면책 공지</h2>
                <p className="text-sm text-amber-200/80 leading-relaxed">
                  본 서비스는 오락 및 독서 추천 목적으로 제작되었습니다.
                  제공되는 심리테스트 결과는 전문적인 심리 상담이나 의료 진단을
                  대체할 수 없습니다. 심리적 어려움이 있으시다면 전문 상담사나
                  의료 전문가와 상담하시기 바랍니다.
                </p>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              메인으로 돌아가기
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[var(--text-muted)] text-xs mt-6">
          © 2024 Minjoo's Shelf. Made with ❤️
        </p>
      </div>
    </main>
  );
}

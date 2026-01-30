'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  resultName: string;
}

export default function ShareButtons({ title, resultName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `나의 독서 유형은 "${resultName}"! 📚\n당신의 독서 유형도 알아보세요!`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleKakaoShare = () => {
    // Kakao SDK가 없으면 링크 복사로 대체
    handleCopyLink();
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-sm text-[var(--text-muted)]">공유하기</span>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="share-btn w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)]"
        title="링크 복사"
      >
        {copied ? (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>

      {/* Twitter */}
      <button
        onClick={handleTwitterShare}
        className="share-btn w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center hover:border-[#1DA1F2] hover:text-[#1DA1F2]"
        title="트위터 공유"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Kakao */}
      <button
        onClick={handleKakaoShare}
        className="share-btn w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center hover:border-[#FEE500] hover:text-[#FEE500]"
        title="카카오톡 공유"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.042 5.906-.178.663-.645 2.407-.737 2.78-.112.462.17.456.357.332.147-.097 2.344-1.595 3.294-2.243.344.048.695.075 1.044.075 5.523 0 10-3.477 10-7.75S17.523 3 12 3z"/>
        </svg>
      </button>
    </div>
  );
}

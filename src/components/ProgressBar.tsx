'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-[var(--text-muted)]">진행률</span>
        <span className="text-sm font-medium text-[var(--accent)]">
          {current + 1} / {total}
        </span>
      </div>
      <div className="progress-bar h-2">
        <div
          className="progress-fill h-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

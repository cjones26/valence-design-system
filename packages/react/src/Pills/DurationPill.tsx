import type { DurationPillProps } from '@valence/types';
import styles from './Pills.module.css';

function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) return '—:—';
  const total = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const statusClass: Record<NonNullable<DurationPillProps['status']>, string> = {
  paused: styles.durationPaused ?? '',
  completed: styles.durationCompleted ?? '',
  live: styles.durationLive ?? '',
};

export function DurationPill({ seconds, status = 'paused' }: DurationPillProps) {
  const duration = formatDuration(seconds);

  return (
    <div
      className={`${styles.duration} ${statusClass[status] ?? ''}`}
      role="timer"
      aria-label={`${status}, ${duration}`}
    >
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
        <path d="M1.5 1l5 3-5 3z" fill="currentColor" />
      </svg>
      {duration}
    </div>
  );
}

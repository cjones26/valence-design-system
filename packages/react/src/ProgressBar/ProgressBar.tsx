import type { ProgressBarProps } from '@valence/types';
import styles from './ProgressBar.module.css';

export const ProgressBar = ({ value, max = 100, label }: ProgressBarProps) => {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const current = Number.isFinite(value) ? Math.min(safeMax, Math.max(0, value)) : 0;

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={current}
    >
      <div className={styles.fill} style={{ width: `${(current / safeMax) * 100}%` }} />
    </div>
  );
};

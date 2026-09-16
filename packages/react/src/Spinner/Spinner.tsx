import type { SpinnerProps } from '@valence/types';
import styles from './Spinner.module.css';

export function Spinner({ size = 14, color = 'currentColor' }: SpinnerProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={styles.spin} role="presentation">
      <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

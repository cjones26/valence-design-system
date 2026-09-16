import type { ToggleProps } from '@valence/types';
import styles from './Toggle.module.css';

export function Toggle({ checked, onChange, disabled, label }: ToggleProps) {
  return (
    <label className={styles.wrap}>
      <input
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={checked}
        disabled={disabled || !onChange}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
      <span className={styles.text}>{label}</span>
    </label>
  );
}

import type { CheckboxProps } from '@valence/types';
import styles from './Checkbox.module.css';

export function Checkbox({ checked, onChange, disabled, label }: CheckboxProps) {
  return (
    <label className={styles.wrap}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        disabled={disabled || !onChange}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={styles.box}>
        <svg className={styles.check} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={styles.text}>{label}</span>
    </label>
  );
}

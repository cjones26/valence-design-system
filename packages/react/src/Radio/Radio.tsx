import type { RadioProps } from '@valencesoftwareio/types';
import styles from './Radio.module.css';

export const Radio = ({ checked, onChange, disabled, label, name }: RadioProps) => {
  return (
    <label className={styles.wrap}>
      <input
        type="radio"
        className={styles.input}
        checked={checked}
        disabled={disabled || !onChange}
        name={name}
        onChange={() => onChange?.()}
      />
      <span className={styles.dot}>
        <span className={styles.inner} />
      </span>
      <span className={styles.text}>{label}</span>
    </label>
  );
};

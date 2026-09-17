import { useId } from 'react';
import type { PickerProps } from '@valence/types';
import { Typography } from '../Typography/Typography';
import styles from './Picker.module.css';

export const Picker = ({
  options,
  value,
  placeholder,
  onChange,
  error,
  disabled,
  helperText,
  label,
}: PickerProps) => {
  const selectId = useId();
  const helperId = useId();

  return (
    <div className={styles.wrap}>
      <label htmlFor={selectId}>
        <Typography variant="label" className={styles.label}>
          {label}
        </Typography>
      </label>
      <select
        id={selectId}
        className={`${styles.select} ${error ? styles.error : ''}`}
        value={value}
        disabled={disabled || !onChange}
        onChange={(event) => onChange?.(event.target.value)}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? helperId : undefined}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <Typography
          variant="meta"
          id={helperId}
          className={`${styles.helper} ${error ? styles.helperError : ''}`}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
};

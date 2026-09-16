import { forwardRef, useId } from 'react';
import type { TextFieldProps } from '@valence/types';
import { Typography } from '../Typography/Typography';
import styles from './TextField.module.css';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    value,
    placeholder,
    onChangeText,
    onSubmit,
    inputMode,
    autoComplete,
    secureTextEntry,
    maxLength,
    error,
    disabled,
    helperText,
    label,
  },
  ref,
) {
  const inputId = useId();
  const helperId = useId();
  return (
    <div className={styles.wrap}>
      <label htmlFor={inputId}>
        <Typography variant="label" className={styles.label}>
          {label}
        </Typography>
      </label>
      <input
        ref={ref}
        id={inputId}
        className={`${styles.field} ${error ? styles.error : ''}`}
        type={secureTextEntry ? 'password' : 'text'}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={!onChangeText}
        onChange={(e) => onChangeText?.(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSubmit?.();
        }}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? helperId : undefined}
      />
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
});

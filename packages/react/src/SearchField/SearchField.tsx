import { useId } from 'react';
import type { SearchFieldProps } from '@valence/types';
import { Icon } from '../Icon/Icon';
import styles from './SearchField.module.css';

export function SearchField({
  value,
  placeholder,
  onChangeText,
  onSubmit,
  disabled,
  label,
}: SearchFieldProps) {
  const inputId = useId();

  return (
    <div className={`${styles.wrap} ${disabled ? styles.disabled : ''}`}>
      <Icon name="search" size={16} />
      <input
        id={inputId}
        type="search"
        aria-label={label}
        value={value ?? ''}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={!onChangeText}
        onChange={(event) => onChangeText?.(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSubmit?.();
        }}
      />
    </div>
  );
}

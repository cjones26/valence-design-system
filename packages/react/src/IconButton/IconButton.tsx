import type { IconButtonProps } from '@valencesoftwareio/types';
import styles from './IconButton.module.css';

export const IconButton = ({
  icon,
  label,
  tone = 'default',
  disabled,
  onPress,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${tone === 'danger' ? styles.danger : ''}`}
      disabled={disabled || !onPress}
      aria-label={label}
      onClick={onPress}
    >
      {typeof icon === 'function' ? icon('currentColor') : icon}
    </button>
  );
};

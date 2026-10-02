import type { LinkProps } from '@valencesoftwareio/types';
import styles from './Link.module.css';

export const Link = ({ href, external, disabled, onPress, children }: LinkProps) => {
  if (disabled) {
    return (
      <span className={styles.disabled} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a
      className={styles.link}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onClick={onPress}
    >
      {children}
    </a>
  );
};

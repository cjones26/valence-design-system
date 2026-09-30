import { useId } from 'react';
import type { AccordionProps } from '@valence/types';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';
import styles from './Accordion.module.css';

export const Accordion = ({ title, expanded, onChange, children }: AccordionProps) => {
  const contentId = useId();
  const textContent = typeof children === 'string' || typeof children === 'number';

  return (
    <div className={styles.accordion}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={expanded}
        aria-controls={contentId}
        disabled={!onChange}
        onClick={() => onChange?.(!expanded)}
      >
        <Typography variant="body" className={styles.title}>
          {title}
        </Typography>
        <span className={`${styles.chevron} ${expanded ? styles.expanded : ''}`}>
          <Icon name="chevron" size={14} />
        </span>
      </button>
      {expanded && (
        <div id={contentId} className={styles.content}>
          {textContent ? <Typography variant="body">{children}</Typography> : children}
        </div>
      )}
    </div>
  );
};

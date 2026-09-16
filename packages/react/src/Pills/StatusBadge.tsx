import type { StatusBadgeProps } from '@valence/types';
import { Typography } from '../Typography/Typography';
import styles from './Pills.module.css';

const statusClass: Record<StatusBadgeProps['status'], string> = {
  success: styles.badgeSuccess ?? '',
  warning: styles.badgeWarning ?? '',
  danger: styles.badgeDanger ?? '',
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <Typography variant="badge" className={`${styles.badge} ${statusClass[status] ?? ''}`}>
      {children}
    </Typography>
  );
}

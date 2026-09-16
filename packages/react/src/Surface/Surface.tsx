import type { SurfaceProps } from '@valence/types';
import styles from './Surface.module.css';

export function Surface({ children }: SurfaceProps) {
  return <div className={styles.surface}>{children}</div>;
}

import type { SurfaceProps } from '@valencesoftwareio/types';
import styles from './Surface.module.css';

export const Surface = ({ children }: SurfaceProps) => {
  return <div className={styles.surface}>{children}</div>;
};

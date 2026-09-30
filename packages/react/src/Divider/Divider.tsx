import type { DividerProps } from '@valencesoftwareio/types';
import styles from './Divider.module.css';

export const Divider = ({ inset = false }: DividerProps) => {
  return <div role="separator" className={`${styles.divider} ${inset ? styles.inset : ''}`} />;
};

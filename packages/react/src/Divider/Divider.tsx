import type { DividerProps } from '@valence/types';
import styles from './Divider.module.css';

export function Divider({ inset = false }: DividerProps) {
  return <div role="separator" className={`${styles.divider} ${inset ? styles.inset : ''}`} />;
}

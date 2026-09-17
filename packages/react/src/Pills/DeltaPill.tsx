import type { DeltaPillProps } from '@valence/types';
import { Typography } from '../Typography/Typography';
import styles from './Pills.module.css';

export const DeltaPill = ({ value, unit = '' }: DeltaPillProps) => {
  const valid = Number.isFinite(value);
  const toneClass =
    valid && value > 0
      ? styles.deltaPositive
      : valid && value < 0
        ? styles.deltaNegative
        : styles.deltaNeutral;

  return (
    <Typography variant="badge" className={`${styles.delta} ${toneClass}`}>
      {valid && value > 0 ? '+' : ''}
      {valid ? value : '—'}
      {unit}
    </Typography>
  );
};

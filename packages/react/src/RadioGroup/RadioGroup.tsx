import { useEffect, useId } from 'react';
import type { RadioGroupProps } from '@valence/types';
import { Radio } from '../Radio/Radio';
import { Typography } from '../Typography/Typography';
import styles from './RadioGroup.module.css';

export function RadioGroup({ options, value, onChange, disabled, label }: RadioGroupProps) {
  const name = useId();
  const labelId = useId();

  const hasDuplicateValues = new Set(options.map((opt) => opt.value)).size !== options.length;
  useEffect(() => {
    if (hasDuplicateValues)
      console.error(
        'RadioGroup: "options" contains duplicate values, which makes selection ambiguous.',
      );
  }, [hasDuplicateValues]);

  return (
    <div className={styles.wrap}>
      <Typography variant="label" id={labelId} className={styles.label}>
        {label}
      </Typography>
      <div className={styles.group} role="radiogroup" aria-labelledby={labelId}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name={name}
            label={opt.label}
            checked={opt.value === value}
            disabled={disabled || !onChange}
            onChange={() => onChange?.(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, type CSSProperties } from 'react';
import type { SliderProps } from '@valence/types';
import styles from './Slider.module.css';

export function Slider({ value, max, min = 0, step = 1, onChange, disabled, label }: SliderProps) {
  const rangeInvalid = !Number.isFinite(min) || !Number.isFinite(max) || min > max;
  const safeMin = rangeInvalid ? 0 : min;
  const safeMax = rangeInvalid ? 0 : max;
  const safeValue = Number.isFinite(value) ? Math.min(safeMax, Math.max(safeMin, value)) : safeMin;

  useEffect(() => {
    if (!Number.isFinite(value)) console.error(`Slider: "value" must be a finite number, got ${value}.`);
    if (rangeInvalid) console.error(`Slider: "min" (${min}) and "max" (${max}) must be finite and min must not exceed max.`);
  }, [max, min, rangeInvalid, value]);

  const pct = safeMax > safeMin ? ((safeValue - safeMin) / (safeMax - safeMin)) * 100 : 0;
  const effectiveStep = Number.isFinite(step) && step > 0 ? step : 1;
  return (
    <input
      type="range"
      className={styles.slider}
      value={safeValue}
      min={safeMin}
      max={safeMax}
      step={effectiveStep}
      disabled={disabled || rangeInvalid || !onChange}
      aria-label={label}
      onChange={(e) => onChange?.(Number(e.target.value))}
      style={{ '--valence-slider-pct': `${pct}%` } as CSSProperties}
    />
  );
}

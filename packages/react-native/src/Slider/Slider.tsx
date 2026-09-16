import NativeSlider from '@react-native-community/slider';
import { useEffect } from 'react';
import type { SliderProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';

export function Slider({ value, max, min = 0, step = 1, onChange, disabled, label }: SliderProps) {
  const theme = useTheme();
  const rangeInvalid = !Number.isFinite(min) || !Number.isFinite(max) || min > max;
  const safeMin = rangeInvalid ? 0 : min;
  const safeMax = rangeInvalid ? 0 : max;
  const safeValue = Number.isFinite(value) ? Math.min(safeMax, Math.max(safeMin, value)) : safeMin;
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const isDisabled = Boolean(disabled || rangeInvalid || !onChange);

  useEffect(() => {
    if (!Number.isFinite(value))
      console.error(`Slider: "value" must be a finite number, got ${value}.`);
    if (rangeInvalid)
      console.error(
        `Slider: "min" (${min}) and "max" (${max}) must be finite and min must not exceed max.`,
      );
  }, [max, min, rangeInvalid, value]);

  return (
    <NativeSlider
      value={safeValue}
      minimumValue={safeMin}
      maximumValue={safeMax}
      step={safeStep}
      disabled={isDisabled}
      onValueChange={onChange}
      accessibilityLabel={label}
      accessibilityRole="adjustable"
      accessibilityValue={{ min: safeMin, max: safeMax, now: safeValue }}
      accessibilityState={{ disabled: isDisabled }}
      minimumTrackTintColor={isDisabled ? theme.color_border_primary : theme.color_text_primary}
      maximumTrackTintColor={isDisabled ? theme.color_border_primary : theme.color_border_control}
      thumbTintColor={isDisabled ? theme.color_text_muted : theme.color_text_primary}
      thumbSize={theme.control_slider_handle}
      tapToSeek
      style={{ height: theme.control_minimum_target }}
    />
  );
}

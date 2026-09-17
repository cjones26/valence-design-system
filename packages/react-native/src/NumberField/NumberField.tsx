import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import type { NumberFieldProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';

export const NumberField = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled,
  error,
  label,
}: NumberFieldProps) => {
  const theme = useTheme();
  const safeMin = min != null && Number.isFinite(min) ? min : -Infinity;
  const safeMax = max != null && Number.isFinite(max) ? max : Infinity;
  const rangeInvalid =
    (min != null && !Number.isFinite(min)) ||
    (max != null && !Number.isFinite(max)) ||
    safeMin > safeMax;
  const fallbackValue = Number.isFinite(safeMin) ? safeMin : Number.isFinite(safeMax) ? safeMax : 0;
  const safeValue = Number.isFinite(value)
    ? rangeInvalid
      ? value
      : Math.min(safeMax, Math.max(safeMin, value))
    : fallbackValue;

  useEffect(() => {
    if (!Number.isFinite(value)) {
      console.error(`NumberField: "value" must be a finite number, got ${value}.`);
    }

    if (rangeInvalid) {
      console.error(
        `NumberField: "min" (${min}) and "max" (${max}) must be finite and min must not exceed max.`,
      );
    }
  }, [max, min, rangeInvalid, value]);

  const atMin = safeValue <= safeMin;
  const atMax = safeValue >= safeMax;
  const effectiveStep = Math.abs(step);
  const stepInvalid = !Number.isFinite(effectiveStep) || effectiveStep === 0;
  // Always a real border — see TextField.tsx for why transparent-until-error
  // left this control with an invisible resting-state boundary.
  const borderColor = error ? theme.color_action_danger_text : theme.color_border_control;

  return (
    <View style={{ gap: 6 }}>
      <Typography variant="label" style={{ color: theme.color_text_secondary }}>
        {label}
      </Typography>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'stretch',
          backgroundColor: disabled
            ? theme.color_background_subtle
            : theme.color_background_primary,
          borderRadius: theme.radius_control,
          overflow: 'hidden',
          minWidth: 148,
          minHeight: theme.control_minimum_target,
          borderWidth: 1.5,
          borderColor: disabled ? theme.color_border_primary : borderColor,
        }}
      >
        <Pressable
          disabled={disabled || rangeInvalid || atMin || stepInvalid || !onChange}
          accessibilityLabel={`Decrease ${label}`}
          accessibilityRole="button"
          onPress={() => onChange?.(Math.max(safeMin, safeValue - effectiveStep))}
          style={{
            width: theme.control_minimum_target,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="numeral"
            style={{
              color:
                atMin || disabled || stepInvalid
                  ? theme.color_text_muted
                  : theme.color_text_secondary,
            }}
          >
            −
          </Typography>
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="numeral"
            style={{ color: disabled ? theme.color_text_muted : theme.color_text_primary }}
          >
            {safeValue}
          </Typography>
        </View>
        <Pressable
          disabled={disabled || rangeInvalid || atMax || stepInvalid || !onChange}
          accessibilityLabel={`Increase ${label}`}
          accessibilityRole="button"
          onPress={() => onChange?.(Math.min(safeMax, safeValue + effectiveStep))}
          style={{
            width: theme.control_minimum_target,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="numeral"
            style={{
              color:
                atMax || disabled || stepInvalid
                  ? theme.color_text_muted
                  : theme.color_text_secondary,
            }}
          >
            +
          </Typography>
        </Pressable>
      </View>
    </View>
  );
};

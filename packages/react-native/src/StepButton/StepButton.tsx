import { Pressable } from 'react-native';
import type { StepButtonProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { alpha } from '../colorMix';
import { Typography } from '../Typography/Typography';
import { useReduceMotion } from '../useReduceMotion';

export function StepButton({ label, tone, disabled, onPress }: StepButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || !onPress;
  const reduceMotion = useReduceMotion();
  const base = tone === 'positive' ? theme.color_state_positive : theme.color_state_red;
  const baseAlpha = tone === 'positive' ? 0.16 : 0.14;
  const fg = isDisabled ? theme.color_text_muted : theme.color_text_primary;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={({ pressed }) => ({
        minHeight: theme.control_minimum_target,
        paddingVertical: theme.spacing_sm,
        paddingHorizontal: theme.spacing_md,
        borderRadius: theme.radius_control,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDisabled
          ? alpha(theme.color_text_primary, 0.04)
          : alpha(base, pressed ? 0.32 : baseAlpha),
        transform: [{ scale: pressed && !isDisabled && !reduceMotion ? 0.95 : 1 }],
        ...(isDisabled && { borderWidth: 1, borderColor: theme.color_border_primary }),
      })}
    >
      <Typography variant="badge" style={{ color: fg }}>
        {label}
      </Typography>
    </Pressable>
  );
}

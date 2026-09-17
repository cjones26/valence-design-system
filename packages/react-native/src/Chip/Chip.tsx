import { Pressable, View } from 'react-native';
import type { ChipProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { lighten } from '../colorMix';
import { Typography } from '../Typography/Typography';
import { useReduceMotion } from '../useReduceMotion';

export const Chip = ({ selected, disabled, icon, onPress, children }: ChipProps) => {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const isDisabled = disabled || !onPress;
  const fg = isDisabled
    ? theme.color_text_muted
    : selected
      ? theme.color_background_primary
      : theme.color_text_primary;

  const background = (pressed: boolean): string => {
    if (isDisabled) {
      return theme.color_background_subtle;
    }
    if (selected) {
      return pressed ? lighten(theme.color_text_primary, 0.2) : theme.color_text_primary;
    }

    return pressed ? theme.color_border_primary : theme.color_background_raised;
  };

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, selected: Boolean(selected) }}
      style={({ pressed }) => ({
        minHeight: theme.control_minimum_target,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: theme.spacing_md,
        borderRadius: theme.radius_pill,
        backgroundColor: background(pressed),
        borderWidth: 1,
        borderColor: isDisabled
          ? theme.color_border_primary
          : selected
            ? 'transparent'
            : theme.color_border_control,
        transform: [{ scale: pressed && !isDisabled && !reduceMotion ? 0.96 : 1 }],
      })}
    >
      {icon != null && (
        <View>
          {typeof icon === 'string' || typeof icon === 'number' ? (
            <Typography variant="label" style={{ color: fg }}>
              {icon}
            </Typography>
          ) : (
            icon(fg)
          )}
        </View>
      )}
      <Typography variant="label" style={{ color: fg }}>
        {children}
      </Typography>
    </Pressable>
  );
};

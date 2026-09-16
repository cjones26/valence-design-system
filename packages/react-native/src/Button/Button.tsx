import { forwardRef, useState } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import type { ButtonProps, ButtonKind, TypographyVariant } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { lighten, alpha } from '../colorMix';
import { Spinner } from '../Spinner/Spinner';
import { Typography } from '../Typography/Typography';
import { useReduceMotion } from '../useReduceMotion';

const TEXT_VARIANT: Record<ButtonKind, TypographyVariant> = {
  primary: 'controlLabel',
  secondary: 'controlLabel',
  ghost: 'controlLabel',
  danger: 'controlLabel',
  dangerConfirm: 'controlLabel',
  pill: 'badge',
};

export const Button = forwardRef<View, ButtonProps>(function Button(
  { kind = 'primary', disabled, loading, onPress, children },
  ref,
) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReduceMotion();
  const GEOMETRY: Record<
    ButtonKind,
    { minHeight: number; paddingHorizontal: number; borderRadius: number }
  > = {
    primary: {
      minHeight: theme.control_minimum_target,
      paddingHorizontal: theme.spacing_lg,
      borderRadius: theme.radius_control,
    },
    secondary: {
      minHeight: theme.control_minimum_target,
      paddingHorizontal: theme.spacing_lg,
      borderRadius: theme.radius_control,
    },
    ghost: {
      minHeight: theme.control_minimum_target,
      paddingHorizontal: theme.spacing_md,
      borderRadius: theme.radius_control,
    },
    danger: {
      minHeight: theme.control_minimum_target,
      paddingHorizontal: theme.spacing_lg,
      borderRadius: theme.radius_control,
    },
    dangerConfirm: {
      minHeight: theme.control_minimum_target,
      paddingHorizontal: theme.spacing_lg,
      borderRadius: theme.radius_control,
    },
    pill: {
      minHeight: theme.control_minimum_target,
      paddingHorizontal: 14,
      borderRadius: theme.radius_pill,
    },
  };
  const geo = GEOMETRY[kind];
  const isUnavailable = disabled || !onPress;
  const isDisabled = isUnavailable || loading;

  function colors(pressed: boolean): { bg: string; fg: string; border?: string } {
    if (isUnavailable) {
      switch (kind) {
        case 'primary':
        case 'pill':
          return {
            bg: alpha(theme.color_text_primary, 0.12),
            fg: theme.color_text_muted,
            border: theme.color_border_primary,
          };
        case 'dangerConfirm':
          return {
            bg: alpha(theme.color_text_primary, 0.04),
            fg: theme.color_text_muted,
            border: theme.color_border_primary,
          };
        case 'secondary':
        case 'danger':
          return {
            bg: alpha(theme.color_text_primary, 0.04),
            fg: theme.color_text_muted,
            border: theme.color_border_primary,
          };
        default:
          return {
            bg: alpha(theme.color_text_primary, 0.04),
            fg: theme.color_text_muted,
            border: theme.color_border_primary,
          };
      }
    }
    switch (kind) {
      case 'primary':
      case 'pill':
        return {
          bg: pressed ? lighten(theme.color_text_primary, 0.2) : theme.color_text_primary,
          fg: theme.color_background_primary,
        };
      case 'secondary':
        return {
          bg: pressed ? alpha(theme.color_text_primary, 0.08) : 'transparent',
          fg: theme.color_text_primary,
          border: pressed ? theme.color_text_secondary : theme.color_border_primary,
        };
      case 'ghost':
        return {
          bg: pressed ? alpha(theme.color_text_primary, 0.08) : 'transparent',
          fg: pressed ? theme.color_text_primary : theme.color_text_secondary,
        };
      case 'danger':
        return {
          bg: pressed ? alpha(theme.color_action_danger, 0.1) : 'transparent',
          fg: theme.color_action_danger_text,
          border: pressed ? theme.color_action_danger : theme.color_border_primary,
        };
      case 'dangerConfirm':
        return {
          bg: theme.color_state_red_strong,
          fg: theme.color_text_on_danger,
        };
    }
  }

  return (
    <Pressable
      ref={ref}
      disabled={isDisabled}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: Boolean(loading) }}
      style={({ pressed }) => {
        const c = colors(pressed);
        const style: ViewStyle = {
          minHeight: geo.minHeight,
          paddingVertical: theme.spacing_sm,
          paddingHorizontal: geo.paddingHorizontal,
          borderRadius: geo.borderRadius,
          backgroundColor: c.bg,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: theme.spacing_sm,
          transform: [{ scale: pressed && !isDisabled && !reduceMotion ? 0.97 : 1 }],
          borderWidth: 1,
          borderColor: c.border ?? 'transparent',
          ...(focused && {
            outlineWidth: 3,
            outlineColor: theme.color_border_focus,
            outlineStyle: 'solid',
          }),
        };
        return style;
      }}
    >
      <Typography
        variant={TEXT_VARIANT[kind]}
        style={{ color: colors(false).fg, opacity: loading ? 0 : 1 }}
      >
        {children}
      </Typography>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner size={14} color={colors(false).fg} />
        </View>
      )}
    </Pressable>
  );
});

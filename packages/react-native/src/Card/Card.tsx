import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { CardProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { alpha } from '../colorMix';
import { Typography } from '../Typography/Typography';
import { useReduceMotion } from '../useReduceMotion';

export const Card = ({ status = 'resting', title, actionLabel, onPress, children }: CardProps) => {
  const theme = useTheme();
  const [pressed, setPressed] = useState(false);
  const reduceMotion = useReduceMotion();
  const describedChildren =
    typeof children === 'string' || typeof children === 'number' ? children : undefined;
  const computedActionLabel =
    actionLabel ??
    [title, status !== 'resting' ? status : undefined, describedChildren]
      .filter(Boolean)
      .join(', ');

  const background =
    status === 'success'
      ? theme.color_state_positive
      : status === 'skipped'
        ? alpha(theme.color_text_primary, 0.04)
        : theme.color_background_raised;

  const contentColor = status === 'success' ? theme.color_text_on_positive : undefined;

  const titleColor = contentColor ?? theme.color_text_secondary;

  const boxShadow =
    status === 'editing'
      ? `inset 0 0 0 2px ${theme.color_text_primary}, ${theme.shadow_surface}`
      : status === 'error'
        ? `0 0 0 1.5px ${theme.color_action_danger}, ${theme.shadow_surface}`
        : theme.shadow_surface;

  return (
    <View
      style={{
        borderRadius: theme.radius_lg,
        padding: 14,
        backgroundColor: background,
        boxShadow,
        transform: [{ scale: pressed && !reduceMotion ? 0.985 : 1 }],
      }}
    >
      {onPress && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={computedActionLabel}
          onPress={onPress}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View
        style={{ gap: 6 }}
        pointerEvents="none"
        accessibilityElementsHidden={Boolean(onPress)}
        importantForAccessibility={onPress ? 'no-hide-descendants' : 'auto'}
      >
        <Typography variant="eyebrow" style={{ color: titleColor }}>
          {title}
        </Typography>
        {children != null &&
          (describedChildren != null ? (
            <Typography
              variant="body"
              style={{ lineHeight: 22, ...(contentColor && { color: contentColor }) }}
            >
              {describedChildren}
            </Typography>
          ) : (
            children
          ))}
      </View>
    </View>
  );
};

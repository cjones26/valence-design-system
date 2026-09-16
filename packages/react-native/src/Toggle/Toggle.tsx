import { useEffect, useRef } from 'react';
import { Animated, I18nManager, Pressable } from 'react-native';
import type { ToggleProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { alpha } from '../colorMix';
import { Typography } from '../Typography/Typography';
import { useReduceMotion } from '../useReduceMotion';

export function Toggle({ checked, onChange, disabled, label }: ToggleProps) {
  const theme = useTheme();
  const isDisabled = disabled || !onChange;
  const anim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    const animation = Animated.timing(anim, {
      toValue: checked ? 1 : 0,
      duration: reduceMotion ? 0 : 180,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [checked, anim, reduceMotion]);

  const trackColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: isDisabled
      ? [theme.color_background_subtle, alpha(theme.color_state_positive, 0.16)]
      : [theme.color_border_primary, theme.color_state_positive],
  });
  const thumbTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, I18nManager.isRTL ? -20 : 20],
  });

  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onChange?.(!checked)}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled: isDisabled }}
      accessibilityLabel={label}
      style={{
        minHeight: theme.control_minimum_target,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing_md,
      }}
    >
      <Animated.View
        style={{
          width: theme.control_switch_width,
          height: theme.control_switch_height,
          borderRadius: theme.radius_pill,
          backgroundColor: trackColor,
          borderWidth: 1,
          borderColor: isDisabled ? theme.color_border_primary : theme.color_border_control,
          padding: 2,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: 28,
            height: 28,
            borderRadius: theme.radius_pill,
            backgroundColor: theme.color_background_raised,
            shadowColor: `rgb(${theme.color_shadow_tint})`,
            shadowOpacity: 0.25,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 1 },
            elevation: 2,
            transform: [{ translateX: thumbTranslate }],
          }}
        />
      </Animated.View>
      <Typography
        variant="body"
        style={{ color: isDisabled ? theme.color_text_muted : theme.color_text_primary }}
      >
        {label}
      </Typography>
    </Pressable>
  );
}

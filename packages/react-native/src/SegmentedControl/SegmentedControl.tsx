import { useEffect, useState } from 'react';
import { Animated, I18nManager, Pressable, View, type LayoutChangeEvent } from 'react-native';
import type { SegmentedControlProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';
import { useReduceMotion } from '../useReduceMotion';

export const SegmentedControl = ({
  options,
  value,
  onChange,
  disabled,
  label,
}: SegmentedControlProps) => {
  const theme = useTheme();

  const hasDuplicateValues = new Set(options.map((opt) => opt.value)).size !== options.length;
  useEffect(() => {
    if (hasDuplicateValues) {
      console.error(
        'SegmentedControl: "options" contains duplicate values, which makes selection ambiguous.',
      );
    }
  }, [hasDuplicateValues]);

  const selectedIndex = options.findIndex((opt) => opt.value === value);
  const [anim] = useState(() => new Animated.Value(Math.max(0, selectedIndex)));
  const [groupWidth, setGroupWidth] = useState(0);
  const indicatorWidth = options.length > 0 ? (groupWidth - 6) / options.length : 0;
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    const animation = Animated.timing(anim, {
      toValue: Math.max(0, selectedIndex),
      duration: reduceMotion ? 0 : 180,
      useNativeDriver: false,
    });
    animation.start();

    return () => animation.stop();
  }, [selectedIndex, anim, reduceMotion]);

  if (options.length === 0) {
    return null;
  }

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      onLayout={(e: LayoutChangeEvent) => setGroupWidth(e.nativeEvent.layout.width)}
      style={{
        minHeight: theme.control_minimum_target,
        flexDirection: 'row',
        backgroundColor: theme.color_background_primary,
        borderRadius: theme.radius_md,
        padding: 3,
      }}
    >
      {groupWidth > 0 && selectedIndex !== -1 && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 3,
            bottom: 3,
            ...(I18nManager.isRTL ? { right: 3 } : { left: 3 }),
            width: indicatorWidth,
            borderRadius: theme.radius_control,
            backgroundColor: disabled
              ? theme.color_background_subtle
              : theme.color_background_raised,
            borderWidth: 1,
            borderColor: disabled ? theme.color_border_primary : theme.color_border_control,
            shadowColor: `rgb(${theme.color_shadow_tint})`,
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
            transform: [
              {
                translateX: Animated.multiply(
                  anim,
                  I18nManager.isRTL ? -indicatorWidth : indicatorWidth,
                ),
              },
            ],
          }}
        />
      )}
      {options.map((opt) => {
        const selected = opt.value === value;

        return (
          <Pressable
            key={opt.value}
            disabled={disabled || !onChange}
            onPress={() => onChange?.(opt.value)}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected, disabled: Boolean(disabled) }}
            style={{
              minHeight: theme.control_minimum_target,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              paddingVertical: 10,
              paddingHorizontal: 6,
              borderRadius: theme.radius_control,
            }}
          >
            {opt.icon != null &&
              (typeof opt.icon === 'string' || typeof opt.icon === 'number' ? (
                <Typography
                  variant="body"
                  style={{ color: disabled ? theme.color_text_muted : theme.color_text_primary }}
                >
                  {opt.icon}
                </Typography>
              ) : (
                opt.icon(
                  disabled
                    ? theme.color_text_muted
                    : selected
                      ? theme.color_text_primary
                      : theme.color_text_secondary,
                )
              ))}
            <Typography
              variant="controlLabel"
              style={{
                color: disabled
                  ? theme.color_text_muted
                  : selected
                    ? theme.color_text_primary
                    : theme.color_text_secondary,
              }}
            >
              {opt.label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
};

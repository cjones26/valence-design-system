import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { CheckboxProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';

export function Checkbox({ checked, onChange, disabled, label }: CheckboxProps) {
  const theme = useTheme();
  const isDisabled = disabled || !onChange;
  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onChange?.(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: isDisabled }}
      accessibilityLabel={label}
      style={{
        minHeight: theme.control_minimum_target,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing_md,
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: theme.radius_sm,
          borderWidth: checked && !isDisabled ? 0 : 1.5,
          borderColor: isDisabled ? theme.color_border_primary : theme.color_border_control,
          backgroundColor: isDisabled
            ? theme.color_background_subtle
            : checked
              ? theme.color_state_positive
              : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <Path
              d="M3 8l3.5 3.5L13 4.5"
              stroke={isDisabled ? theme.color_text_muted : theme.color_text_on_positive}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </View>
      <Typography
        variant="body"
        style={{ color: isDisabled ? theme.color_text_muted : theme.color_text_primary }}
      >
        {label}
      </Typography>
    </Pressable>
  );
}

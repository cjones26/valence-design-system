import { Picker as NativePicker } from '@react-native-picker/picker';
import { View } from 'react-native';
import type { PickerProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';

export const Picker = ({
  options,
  value,
  placeholder,
  onChange,
  error,
  disabled,
  helperText,
  label,
}: PickerProps) => {
  const theme = useTheme();
  const isDisabled = disabled || !onChange;
  const borderColor = error ? theme.color_action_danger_text : theme.color_border_control;

  return (
    <View style={{ gap: 6 }}>
      <Typography variant="label" style={{ color: theme.color_text_secondary }}>
        {label}
      </Typography>
      <View
        style={{
          minHeight: theme.control_field_height,
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: isDisabled
            ? theme.color_background_subtle
            : theme.color_background_primary,
          borderWidth: 1.5,
          borderColor: isDisabled ? theme.color_border_primary : borderColor,
          borderRadius: theme.radius_control,
        }}
      >
        <NativePicker
          selectedValue={value}
          enabled={!isDisabled}
          onValueChange={(nextValue) => onChange?.(String(nextValue))}
          accessibilityLabel={label}
          accessibilityHint={helperText}
          accessibilityState={{ disabled: isDisabled }}
          dropdownIconColor={isDisabled ? theme.color_text_muted : theme.color_text_primary}
          style={{
            minHeight: theme.control_field_height,
            color: isDisabled ? theme.color_text_muted : theme.color_text_primary,
          }}
        >
          {placeholder && <NativePicker.Item label={placeholder} value="" enabled={false} />}
          {options.map((option) => (
            <NativePicker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </NativePicker>
      </View>
      {helperText && (
        <Typography
          variant="meta"
          style={{ color: error ? theme.color_action_danger_text : theme.color_text_secondary }}
        >
          {helperText}
        </Typography>
      )}
    </View>
  );
};

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
  const borderColor = error ? theme.colorActionDangerText : theme.colorBorderControl;

  return (
    <View style={{ gap: 6 }}>
      <Typography variant="label" style={{ color: theme.colorTextSecondary }}>
        {label}
      </Typography>
      <View
        style={{
          minHeight: theme.controlFieldHeight,
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: isDisabled ? theme.colorBackgroundSubtle : theme.colorBackgroundPrimary,
          borderWidth: 1.5,
          borderColor: isDisabled ? theme.colorBorderPrimary : borderColor,
          borderRadius: theme.radiusControl,
        }}
      >
        <NativePicker
          selectedValue={value}
          enabled={!isDisabled}
          onValueChange={(nextValue) => onChange?.(String(nextValue))}
          accessibilityLabel={label}
          accessibilityHint={helperText}
          accessibilityState={{ disabled: isDisabled }}
          dropdownIconColor={isDisabled ? theme.colorTextMuted : theme.colorTextPrimary}
          style={{
            minHeight: theme.controlFieldHeight,
            color: isDisabled ? theme.colorTextMuted : theme.colorTextPrimary,
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
          style={{ color: error ? theme.colorActionDangerText : theme.colorTextSecondary }}
        >
          {helperText}
        </Typography>
      )}
    </View>
  );
};

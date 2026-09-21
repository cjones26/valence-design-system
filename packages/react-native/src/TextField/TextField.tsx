import { useEffect, useRef, useState, type Ref } from 'react';
import { AccessibilityInfo, TextInput, View } from 'react-native';
import type { TextFieldProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { GEIST } from '../fonts';
import { Typography } from '../Typography/Typography';

type TextFieldComponentProps = TextFieldProps & { ref?: Ref<TextInput> };

export const TextField = ({
  value,
  placeholder,
  onChangeText,
  onSubmit,
  inputMode,
  autoComplete,
  secureTextEntry,
  maxLength,
  error,
  disabled,
  helperText,
  label,
  ref,
}: TextFieldComponentProps) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const wasInvalid = useRef(false);

  useEffect(() => {
    if (error && !wasInvalid.current) {
      AccessibilityInfo.announceForAccessibility(`${label} is invalid`);
    }

    wasInvalid.current = Boolean(error);
  }, [error, label]);

  const focusedBorder = focused ? theme.colorTextPrimary : theme.colorBorderControl;
  const borderColor = error ? theme.colorActionDangerText : focusedBorder;

  return (
    <View style={{ gap: 6 }}>
      <Typography variant="label" style={{ color: theme.colorTextSecondary }}>
        {label}
      </Typography>
      <TextInput
        ref={ref}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colorTextSecondary}
        editable={!disabled && Boolean(onChangeText)}
        inputMode={inputMode}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityLabel={label}
        accessibilityHint={error ? `Invalid. ${helperText ?? ''}`.trim() : helperText}
        accessibilityState={{ disabled: Boolean(disabled) }}
        style={{
          backgroundColor: disabled ? theme.colorBackgroundSubtle : theme.colorBackgroundPrimary,
          borderRadius: theme.radiusControl,
          paddingVertical: 14,
          paddingHorizontal: theme.spacingMd,
          minHeight: theme.controlFieldHeight,
          borderWidth: 1.5,
          borderColor: disabled ? theme.colorBorderPrimary : borderColor,
          fontSize: theme.typeBodyLgSize,
          letterSpacing: theme.typeBodyLgSize * theme.typeBodyLgTracking,
          ...GEIST.semibold,
          color: disabled ? theme.colorTextMuted : theme.colorTextPrimary,
        }}
      />
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

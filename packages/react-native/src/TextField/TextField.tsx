import { forwardRef, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, TextInput, View } from 'react-native';
import type { TextFieldProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { GEIST } from '../fonts';
import { Typography } from '../Typography/Typography';

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  {
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
  },
  forwardedRef,
) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const wasInvalid = useRef(false);

  useEffect(() => {
    if (error && !wasInvalid.current) {
      AccessibilityInfo.announceForAccessibility(`${label} is invalid`);
    }

    wasInvalid.current = Boolean(error);
  }, [error, label]);

  // Always a real border — field bg matches the page bg, so transparent
  // left it with zero visible boundary at rest.
  const borderColor = error
    ? theme.color_action_danger_text
    : focused
      ? theme.color_text_primary
      : theme.color_border_control;

  return (
    <View style={{ gap: 6 }}>
      <Typography variant="label" style={{ color: theme.color_text_secondary }}>
        {label}
      </Typography>
      <TextInput
        ref={forwardedRef}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.color_text_secondary}
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
          backgroundColor: disabled
            ? theme.color_background_subtle
            : theme.color_background_primary,
          borderRadius: theme.radius_control,
          paddingVertical: 14,
          paddingHorizontal: theme.spacing_md,
          minHeight: theme.control_field_height,
          borderWidth: 1.5,
          borderColor: disabled ? theme.color_border_primary : borderColor,
          // Not a <Typography> instance — it's the TextInput itself, which
          // can't be wrapped — so it references the bodyLg tier directly.
          fontSize: theme.type_body_lg_size,
          letterSpacing: theme.type_body_lg_size * theme.type_body_lg_tracking,
          ...GEIST.semibold,
          color: disabled ? theme.color_text_muted : theme.color_text_primary,
        }}
      />
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
});

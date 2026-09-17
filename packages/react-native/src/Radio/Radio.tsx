import { Pressable, View } from 'react-native';
import type { RadioProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';

export const Radio = ({ checked, onChange, disabled, label }: RadioProps) => {
  const theme = useTheme();
  const isDisabled = disabled || !onChange;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onChange?.()}
      accessibilityRole="radio"
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
          width: 24,
          height: 24,
          borderRadius: theme.radius_pill,
          borderWidth: 1.5,
          borderColor: isDisabled
            ? theme.color_border_primary
            : checked
              ? theme.color_text_primary
              : theme.color_border_control,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: theme.radius_pill,
              backgroundColor: isDisabled ? theme.color_text_muted : theme.color_text_primary,
            }}
          />
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
};

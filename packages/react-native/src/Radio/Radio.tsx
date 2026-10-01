import { Pressable, View } from 'react-native';
import type { RadioProps } from '@valencesoftwareio/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';

export const Radio = ({ checked, onChange, disabled, label }: RadioProps) => {
  const theme = useTheme();
  const isDisabled = disabled || !onChange;
  const activeBorder = checked ? theme.colorControlSelected : theme.colorBorderControl;
  const borderColor = isDisabled ? theme.colorBorderPrimary : activeBorder;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onChange?.()}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled: isDisabled }}
      accessibilityLabel={label}
      style={{
        minHeight: theme.controlMinimumTarget,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacingMd,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: theme.radiusPill,
          borderWidth: 1.5,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: theme.radiusPill,
              backgroundColor: isDisabled ? theme.colorTextMuted : theme.colorControlSelected,
            }}
          />
        )}
      </View>
      <Typography
        variant="body"
        style={{ color: isDisabled ? theme.colorTextMuted : theme.colorTextPrimary }}
      >
        {label}
      </Typography>
    </Pressable>
  );
};

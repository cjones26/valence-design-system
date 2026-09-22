import { TextInput, View } from 'react-native';
import type { SearchFieldProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Icon } from '../Icon/Icon';
import { GEIST } from '../foundations/fonts';

export const SearchField = ({
  value,
  placeholder,
  onChangeText,
  onSubmit,
  disabled,
  label,
}: SearchFieldProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        width: '100%',
        minHeight: theme.controlFieldHeight,
        paddingHorizontal: theme.spacingMd,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacingSm,
        backgroundColor: disabled ? theme.colorBackgroundSubtle : theme.colorBackgroundRaised,
        borderRadius: theme.radiusControl,
        boxShadow: disabled ? undefined : theme.shadowSurface,
      }}
    >
      <Icon name="search" size={16} color={theme.colorTextMuted} />
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colorTextMuted}
        editable={!disabled && Boolean(onChangeText)}
        accessibilityLabel={label}
        accessibilityState={{ disabled: Boolean(disabled) }}
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        style={{
          flex: 1,
          alignSelf: 'stretch',
          paddingVertical: 0,
          color: disabled ? theme.colorTextMuted : theme.colorTextPrimary,
          fontSize: theme.typeBodyLgSize,
          ...GEIST.regular,
        }}
      />
    </View>
  );
};

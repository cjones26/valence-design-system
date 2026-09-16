import { TextInput, View } from 'react-native';
import type { SearchFieldProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Icon } from '../Icon/Icon';
import { GEIST } from '../fonts';

export function SearchField({
  value,
  placeholder,
  onChangeText,
  onSubmit,
  disabled,
  label,
}: SearchFieldProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: '100%',
        minHeight: theme.control_field_height,
        paddingHorizontal: theme.spacing_md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing_sm,
        backgroundColor: disabled ? theme.color_background_subtle : theme.color_background_raised,
        borderRadius: theme.radius_control,
        boxShadow: disabled ? undefined : theme.shadow_surface,
      }}
    >
      <Icon name="search" size={16} color={theme.color_text_muted} />
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.color_text_muted}
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
          color: disabled ? theme.color_text_muted : theme.color_text_primary,
          fontSize: theme.type_body_lg_size,
          ...GEIST.regular,
        }}
      />
    </View>
  );
}

import { Pressable, View, type ViewStyle } from 'react-native';
import type { ListRowProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { GEIST } from '../fonts';
import { Typography } from '../Typography/Typography';
import { useReduceMotion } from '../useReduceMotion';

export function ListRow({
  icon,
  title,
  subtitle,
  trailingIcon,
  archived,
  grouped,
  onPress,
}: ListRowProps) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const accessibleLabel = [title, archived ? 'archived' : undefined, subtitle]
    .filter(Boolean)
    .join(', ');

  const content = (
    <>
      {icon != null && (
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            backgroundColor: theme.color_background_primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {typeof icon === 'string' || typeof icon === 'number' ? (
            <Typography variant="body">{icon}</Typography>
          ) : (
            icon(theme.color_text_primary)
          )}
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Typography
          variant="body"
          style={{
            ...GEIST.bold,
            color: theme.color_text_primary,
            textDecorationLine: archived ? 'line-through' : 'none',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="meta" style={{ color: theme.color_text_secondary, marginTop: 2 }}>
            {subtitle}
          </Typography>
        )}
      </View>
      {trailingIcon != null && (
        <View
          style={{ marginStart: 'auto' }}
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {typeof trailingIcon === 'string' || typeof trailingIcon === 'number' ? (
            <Typography variant="body" style={{ color: theme.color_text_secondary }}>
              {trailingIcon}
            </Typography>
          ) : (
            trailingIcon(theme.color_text_secondary)
          )}
        </View>
      )}
    </>
  );

  const rowStyle: ViewStyle = {
    backgroundColor: theme.color_background_raised,
    borderRadius: grouped ? 0 : 14,
    paddingVertical: theme.spacing_md,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing_md,
    opacity: archived ? 0.55 : 1,
    boxShadow: grouped ? undefined : theme.shadow_surface,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibleLabel}
        style={({ pressed }) => ({
          ...rowStyle,
          transform: [{ scale: pressed && !reduceMotion ? 0.99 : 1 }],
        })}
      >
        {content}
      </Pressable>
    );
  }
  return <View style={rowStyle}>{content}</View>;
}

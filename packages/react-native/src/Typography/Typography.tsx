import { Text, type TextProps, type TextStyle } from 'react-native';
import type { Theme } from '@valence/tokens';
import type { TypographyProps as SharedTypographyProps, TypographyVariant } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { GEIST } from '../fonts';

export interface TypographyProps extends SharedTypographyProps, Omit<TextProps, 'children'> {}

const HEADER_VARIANTS = new Set<TypographyVariant>(['display', 'title', 'titleSm']);

const weightStyle = (weight: number): Pick<TextStyle, 'fontFamily' | 'fontWeight'> => {
  if (weight >= 700) {
    return GEIST.bold;
  }
  if (weight >= 600) {
    return GEIST.semibold;
  }

  return GEIST.regular;
};

const variantStyle = (variant: TypographyVariant, theme: Theme): TextStyle => {
  switch (variant) {
    case 'display':
      return {
        fontSize: theme.type_display_size,
        letterSpacing: theme.type_display_size * theme.type_display_tracking,
        ...weightStyle(theme.type_display_weight),
      };
    case 'title':
      return {
        fontSize: theme.type_title_size,
        letterSpacing: theme.type_title_size * theme.type_title_tracking,
        ...weightStyle(theme.type_title_weight),
      };
    case 'titleSm':
      return {
        fontSize: theme.type_title_sm_size,
        letterSpacing: theme.type_title_sm_size * theme.type_title_sm_tracking,
        ...weightStyle(theme.type_title_sm_weight),
      };
    case 'body':
      return {
        fontSize: theme.type_body_size,
        letterSpacing: theme.type_body_size * theme.type_body_tracking,
        ...weightStyle(theme.type_body_weight),
      };
    case 'bodyLg':
      return {
        fontSize: theme.type_body_lg_size,
        letterSpacing: theme.type_body_lg_size * theme.type_body_lg_tracking,
        ...weightStyle(theme.type_body_lg_weight),
      };
    case 'meta':
      return {
        fontSize: theme.type_meta_size,
        letterSpacing: theme.type_meta_size * theme.type_meta_tracking,
        ...weightStyle(theme.type_meta_weight),
      };
    case 'eyebrow':
      return {
        fontSize: theme.type_eyebrow_size,
        letterSpacing: theme.type_eyebrow_size * theme.type_eyebrow_tracking,
        textTransform: 'uppercase',
        ...weightStyle(theme.type_eyebrow_weight),
      };
    case 'numeral':
      return {
        fontSize: theme.type_numeral_size,
        letterSpacing: theme.type_numeral_size * theme.type_numeral_tracking,
        fontVariant: ['tabular-nums'],
        ...weightStyle(theme.type_numeral_weight),
      };
    case 'label':
      return {
        fontSize: theme.type_label_size,
        letterSpacing: theme.type_label_size * theme.type_label_tracking,
        ...weightStyle(theme.type_label_weight),
      };
    case 'badge':
      return {
        fontSize: theme.type_badge_size,
        letterSpacing: theme.type_badge_size * theme.type_badge_tracking,
        ...weightStyle(theme.type_badge_weight),
      };
    case 'controlLabel':
      return {
        fontSize: theme.type_control_label_size,
        letterSpacing: theme.type_control_label_size * theme.type_control_label_tracking,
        ...weightStyle(theme.type_control_label_weight),
      };
  }
};

export const Typography = ({
  variant,
  children,
  style,
  accessibilityRole,
  ...rest
}: TypographyProps) => {
  const theme = useTheme();

  return (
    <Text
      accessibilityRole={accessibilityRole ?? (HEADER_VARIANTS.has(variant) ? 'header' : undefined)}
      style={[{ color: theme.color_text_primary }, variantStyle(variant, theme), style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

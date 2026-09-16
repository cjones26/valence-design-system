import { View } from 'react-native';
import type { DeltaPillProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { alpha } from '../colorMix';
import { Typography } from '../Typography/Typography';

export function DeltaPill({ value, unit = '' }: DeltaPillProps) {
  const theme = useTheme();
  const valid = Number.isFinite(value);

  let background: string;
  let foreground: string;
  if (valid && value > 0) {
    background = alpha(theme.color_state_positive, 0.16);
    foreground = theme.color_text_primary;
  } else if (valid && value < 0) {
    background = alpha(theme.color_state_red, 0.14);
    foreground = theme.color_text_primary;
  } else {
    background = alpha(theme.color_text_primary, 0.1);
    foreground = theme.color_text_secondary;
  }

  return (
    <View
      style={{
        paddingVertical: theme.spacing_xs,
        paddingHorizontal: 10,
        borderRadius: theme.radius_pill,
        backgroundColor: background,
        alignSelf: 'flex-start',
      }}
    >
      <Typography variant="badge" style={{ color: foreground }}>
        {valid && value > 0 ? '+' : ''}
        {valid ? value : '—'}
        {unit}
      </Typography>
    </View>
  );
}

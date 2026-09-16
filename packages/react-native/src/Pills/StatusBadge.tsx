import { View } from 'react-native';
import type { StatusBadgeProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const theme = useTheme();
  const { bg, fg } = {
    success: { bg: theme.color_state_positive, fg: theme.color_text_on_positive },
    warning: { bg: theme.color_state_yellow, fg: theme.color_text_on_yellow },
    danger: { bg: theme.color_state_red_strong, fg: theme.color_text_on_danger },
  }[status];

  return (
    <View
      style={{
        paddingVertical: 6,
        paddingHorizontal: theme.spacing_md,
        borderRadius: theme.radius_pill,
        backgroundColor: bg,
        alignSelf: 'flex-start',
      }}
    >
      <Typography variant="badge" style={{ color: fg }}>
        {children}
      </Typography>
    </View>
  );
}

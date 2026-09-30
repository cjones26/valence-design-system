import { View } from 'react-native';
import type { StatusBadgeProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';

export const StatusBadge = ({ status, children }: StatusBadgeProps) => {
  const theme = useTheme();
  const { bg, fg } = {
    success: { bg: theme.colorStatePositive, fg: theme.colorTextOnPositive },
    warning: { bg: theme.colorStateYellow, fg: theme.colorTextOnYellow },
    danger: { bg: theme.colorStateRedStrong, fg: theme.colorTextOnDanger },
  }[status];

  return (
    <View
      style={{
        paddingVertical: 6,
        paddingHorizontal: theme.spacingMd,
        borderRadius: theme.radiusPill,
        backgroundColor: bg,
        alignSelf: 'flex-start',
      }}
    >
      <Typography variant="badge" style={{ color: fg }}>
        {children}
      </Typography>
    </View>
  );
};

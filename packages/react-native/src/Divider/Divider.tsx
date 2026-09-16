import { View } from 'react-native';
import type { DividerProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';

export function Divider({ inset = false }: DividerProps) {
  const theme = useTheme();

  return (
    <View
      accessibilityRole="none"
      style={{
        height: 1,
        marginHorizontal: inset ? 14 : 0,
        backgroundColor: theme.color_border_divider,
      }}
    />
  );
}

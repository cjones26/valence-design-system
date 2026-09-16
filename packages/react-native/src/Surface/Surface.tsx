import { View } from 'react-native';
import type { SurfaceProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { NativeContent } from '../NativeContent';

export function Surface({ children }: SurfaceProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: theme.color_background_raised,
        borderRadius: theme.radius_lg,
        boxShadow: theme.shadow_surface,
      }}
    >
      <NativeContent>{children}</NativeContent>
    </View>
  );
}

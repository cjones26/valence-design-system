import Svg, { Path } from 'react-native-svg';
import { ICON_GLYPHS, type IconProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';

// No "currentColor" default here — RN's SVG has no CSS cascade for it.
export const Icon = ({ name, size = 20, color }: IconProps) => {
  const theme = useTheme();
  const resolvedColor = color ?? theme.color_text_primary;
  const glyph = ICON_GLYPHS[name];

  return (
    <Svg width={size} height={size} viewBox={glyph.viewBox} fill="none">
      <Path
        d={glyph.d}
        stroke={glyph.filled ? undefined : resolvedColor}
        fill={glyph.filled ? resolvedColor : 'none'}
        strokeWidth={glyph.filled ? undefined : glyph.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

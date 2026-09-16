import { ICON_GLYPHS, type IconProps } from '@valence/types';

export function Icon({ name, size = 20, color = 'currentColor' }: IconProps) {
  const glyph = ICON_GLYPHS[name];

  return (
    <svg width={size} height={size} viewBox={glyph.viewBox} fill="none" aria-hidden="true">
      <path
        d={glyph.d}
        stroke={glyph.filled ? undefined : color}
        fill={glyph.filled ? color : 'none'}
        strokeWidth={glyph.filled ? undefined : glyph.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import type { IconProps } from '@valence/types';

const glyphs: Record<
  IconProps['name'],
  { d: string; viewBox: string; filled?: boolean; strokeWidth?: number }
> = {
  back: { d: 'M12 5l-5 5 5 5', viewBox: '0 0 20 20', strokeWidth: 1.8 },
  close: { d: 'M5 5l10 10M15 5L5 15', viewBox: '0 0 20 20', strokeWidth: 1.8 },
  menu: { d: 'M3 6.5h14M3 10h14M3 13.5h14', viewBox: '0 0 20 20', strokeWidth: 1.6 },
  chevron: { d: 'M5 3l4 4-4 4', viewBox: '0 0 14 14', strokeWidth: 1.6 },
  play: { d: 'M4 3l7 4-7 4V3z', viewBox: '0 0 14 14', filled: true },
  pause: { d: 'M2.5 2h2.5v8H2.5zM7 2h2.5v8H7z', viewBox: '0 0 12 12', filled: true },
  check: { d: 'M3 7.5L5.8 10 11 4', viewBox: '0 0 14 14', strokeWidth: 2 },
  search: {
    d: 'M13 13l4 4M15 8.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z',
    viewBox: '0 0 20 20',
    strokeWidth: 1.7,
  },
  reorder: { d: 'M4 6h12M4 10h12M4 14h12', viewBox: '0 0 20 20', strokeWidth: 1.8 },
  edit: {
    d: 'M4 15.5l.8-3.5L13 3.8l3.2 3.2L8 15.2l-4 .3zM11.5 5.3l3.2 3.2',
    viewBox: '0 0 20 20',
    strokeWidth: 1.6,
  },
  reset: { d: 'M5 6H2.5V3.5M3 6a7 7 0 11-1 6', viewBox: '0 0 20 20', strokeWidth: 1.7 },
  settings: {
    d: 'M3 6h5M12 6h5M3 14h2M9 14h8M8 3.5v5M5 11.5v5',
    viewBox: '0 0 20 20',
    strokeWidth: 1.7,
  },
  calendar: {
    d: 'M4 4.5h12v12H4zM4 8h12M7 2.5v4M13 2.5v4',
    viewBox: '0 0 20 20',
    strokeWidth: 1.6,
  },
  activity: { d: 'M2.5 11h3l2-7 3.5 12 2-6h4.5', viewBox: '0 0 20 20', strokeWidth: 1.7 },
};

export function Icon({ name, size = 20, color = 'currentColor' }: IconProps) {
  // Safe: `glyphs` is a Record over the exact IconName union, so every
  // name has an entry — noUncheckedIndexedAccess just can't see that.
  const g = glyphs[name]!;

  return (
    <svg width={size} height={size} viewBox={g.viewBox} fill="none" aria-hidden="true">
      <path
        d={g.d}
        stroke={g.filled ? undefined : color}
        fill={g.filled ? color : 'none'}
        strokeWidth={g.filled ? undefined : g.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

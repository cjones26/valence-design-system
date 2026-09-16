// RN has no CSS color-mix() — these do the same job at render time. Colors
// are parsed via RN's own color-normalization package (the same one behind
// RN's built-in processColor), so a theme override given as hex, rgb()/
// rgba(), hsl(), or a CSS named color all work, not just the 6-digit hex
// the token pipeline itself always emits.
import normalizeColor from '@react-native/normalize-colors';

function toRgb(color: string): [number, number, number] {
  const packed = normalizeColor(color);
  if (typeof packed !== 'number') {
    throw new Error(`colorMix: could not parse color "${color}"`);
  }
  return [(packed >>> 24) & 0xff, (packed >>> 16) & 0xff, (packed >>> 8) & 0xff];
}

function toHex(n: number): string {
  return Math.max(0, Math.min(255, Math.round(n)))
    .toString(16)
    .padStart(2, '0');
}

/** Mixes `color` toward white by `amount` (0–1) — e.g. a pressed-lighter tint. */
export function lighten(color: string, amount: number): string {
  const [r, g, b] = toRgb(color);
  return `#${toHex(r + (255 - r) * amount)}${toHex(g + (255 - g) * amount)}${toHex(b + (255 - b) * amount)}`;
}

/** `color` at alpha `a` (0–1), as an rgba() string RN's style values accept. */
export function alpha(color: string, a: number): string {
  const [r, g, b] = toRgb(color);
  return `rgba(${r},${g},${b},${a})`;
}

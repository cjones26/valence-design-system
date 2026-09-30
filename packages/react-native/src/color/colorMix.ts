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

export function lighten(color: string, amount: number): string {
  const [r, g, b] = toRgb(color);

  return `#${toHex(r + (255 - r) * amount)}${toHex(g + (255 - g) * amount)}${toHex(b + (255 - b) * amount)}`;
}

export function alpha(color: string, a: number): string {
  const [r, g, b] = toRgb(color);

  return `rgba(${r},${g},${b},${a})`;
}

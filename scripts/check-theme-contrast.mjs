import { readFileSync, readdirSync } from 'node:fs';
import { URL } from 'node:url';

const THEMES_DIR = new URL('../packages/tokens/tokens/themes/', import.meta.url);
const MODES = ['light', 'dark'];
const CHECKS = [
  ['text.primary', 'background.primary', 4.5],
  ['text.primary', 'background.raised', 4.5],
  ['text.secondary', 'background.primary', 4.5],
  ['text.secondary', 'background.raised', 4.5],
  ['text.primary', 'background.subtle', 4.5],
  ['text.secondary', 'background.subtle', 4.5],
  ['text.muted', 'background.subtle', 3],
  ['action.dangerText', 'background.primary', 4.5],
  ['action.dangerText', 'background.raised', 4.5],
  ['text.onPositive', 'state.positive', 4.5],
  ['text.onDanger', 'state.redStrong', 4.5],
  ['text.onYellow', 'state.yellow', 4.5],
  ['border.control', 'background.primary', 3],
  ['border.control', 'background.raised', 3],
  ['border.control', 'background.subtle', 3],
  ['border.focus', 'background.primary', 3],
  ['border.focus', 'background.raised', 3],
];

function tokenValue(tokens, path) {
  return path.split('.').reduce((value, key) => value[key], tokens).value;
}

function parseColor(value) {
  if (value.startsWith('#')) {
    const hex = value.slice(1);

    return {
      channels: [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16)),
      alpha: 1,
    };
  }

  const values = value.match(/[\d.]+/g)?.map(Number);
  if (!values || values.length < 3) {
    throw new Error(`Unsupported color: ${value}`);
  }

  return { channels: values.slice(0, 3), alpha: values[3] ?? 1 };
}

function composite(foreground, background) {
  return foreground.channels.map(
    (channel, index) => channel * foreground.alpha + background[index] * (1 - foreground.alpha),
  );
}

function surface(tokens, path, primarySurface) {
  const color = parseColor(tokenValue(tokens.color, path));

  return color.alpha < 1 ? composite(color, primarySurface) : color.channels;
}

function luminance(channels) {
  const [red, green, blue] = channels
    .map((channel) => channel / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);

  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

const failures = [];
const raisedColors = new Map(MODES.map((mode) => [mode, new Set()]));
for (const theme of readdirSync(THEMES_DIR)) {
  for (const mode of MODES) {
    const tokens = JSON.parse(readFileSync(new URL(`${theme}/${mode}/color.json`, THEMES_DIR)));
    const primarySurface = parseColor(tokenValue(tokens.color, 'background.primary')).channels;
    const raisedSurface = parseColor(tokenValue(tokens.color, 'background.raised')).channels;
    raisedColors.get(mode).add(tokenValue(tokens.color, 'background.raised'));
    if (luminance(raisedSurface) <= luminance(primarySurface)) {
      failures.push(`${theme}/${mode}: background.raised must be lighter than background.primary`);
    }
    for (const [foregroundPath, backgroundPath, minimum] of CHECKS) {
      const background = surface(tokens, backgroundPath, primarySurface);
      const foreground = composite(
        parseColor(tokenValue(tokens.color, foregroundPath)),
        background,
      );
      const ratio = contrast(foreground, background);
      if (ratio < minimum) {
        failures.push(
          `${theme}/${mode}: ${foregroundPath} on ${backgroundPath} is ${ratio.toFixed(2)}:1; expected ${minimum}:1`,
        );
      }
    }
  }
}

if (raisedColors.get('light').size !== 1 || !raisedColors.get('light').has('#ffffff')) {
  failures.push('light: background.raised must be #ffffff in every theme');
}
if (raisedColors.get('dark').size === 1) {
  failures.push('dark: background.raised must retain the hue relationship of each theme canvas');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Theme contrast passed for every theme and mode.');
}

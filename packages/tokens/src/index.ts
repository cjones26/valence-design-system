import { theme as hiVisLight } from './generated/hi-vis-light.js';
import { theme as hiVisDark } from './generated/hi-vis-dark.js';
import { theme as seaGlassLight } from './generated/sea-glass-light.js';
import { theme as seaGlassDark } from './generated/sea-glass-dark.js';
import { theme as bauhausLight } from './generated/bauhaus-light.js';
import { theme as bauhausDark } from './generated/bauhaus-dark.js';
import { theme as earthyLight } from './generated/earthy-light.js';
import { theme as earthyDark } from './generated/earthy-dark.js';
import { theme as tropicalLight } from './generated/tropical-light.js';
import { theme as tropicalDark } from './generated/tropical-dark.js';
import { theme as sunsetBerryLight } from './generated/sunset-berry-light.js';
import { theme as sunsetBerryDark } from './generated/sunset-berry-dark.js';
import { theme as bodegaLight } from './generated/bodega-light.js';
import { theme as bodegaDark } from './generated/bodega-dark.js';
import { theme as indigoPopLight } from './generated/indigo-pop-light.js';
import { theme as indigoPopDark } from './generated/indigo-pop-dark.js';
import type { ThemeColorKey } from './generated/theme-color-keys.js';

export type Theme = typeof hiVisLight;
export type ThemeMode = 'light' | 'dark';
export type ThemePreset = 'hi-vis' | 'sea-glass' | 'bauhaus' | 'earthy' | 'tropical' | 'sunset-berry' | 'bodega' | 'indigo-pop';
// Runtime overrides are restricted to color tokens — see build.mjs's
// theme-color-keys generator for why.
export type ThemeOverride = Partial<Pick<Theme, ThemeColorKey>>;

export const themes: Record<ThemePreset, Record<ThemeMode, Theme>> = {
  'hi-vis': { light: hiVisLight, dark: hiVisDark },
  'sea-glass': { light: seaGlassLight, dark: seaGlassDark },
  bauhaus: { light: bauhausLight, dark: bauhausDark },
  earthy: { light: earthyLight, dark: earthyDark },
  tropical: { light: tropicalLight, dark: tropicalDark },
  'sunset-berry': { light: sunsetBerryLight, dark: sunsetBerryDark },
  bodega: { light: bodegaLight, dark: bodegaDark },
  'indigo-pop': { light: indigoPopLight, dark: indigoPopDark },
};

import { useSyncExternalStore, type ReactNode, type CSSProperties } from 'react';
import type { ThemeMode, ThemeOverride, ThemePreset } from '@valence/tokens';

export interface ThemeProviderProps {
  /** Selects one of the built-in presets via data-preset. Defaults to 'hi-vis' for each provider. */
  preset?: ThemePreset;
  /** Forces light/dark mode for this subtree via data-theme. Omit to resolve
   * from the OS/browser color-scheme preference (matching native's
   * useColorScheme() behavior). */
  mode?: ThemeMode;
  /** Color token overrides for this subtree — e.g. a client's brand colors. */
  theme?: ThemeOverride;
  children: ReactNode;
}

function toCssVars(theme: ThemeOverride): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme)) {
    vars[`--${key.replace(/_/g, '-')}`] = String(value);
  }
  return vars as CSSProperties;
}

function subscribeToSystemScheme(callback: () => void) {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSystemScheme(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Always renders one wrapper element regardless of which props are given, so
 * this subtree's DOM shape doesn't change based on props.
 *
 * data-theme is always resolved to a concrete "light"/"dark" value (never
 * omitted) — the generated preset selectors are compound
 * ([data-preset="x"][data-theme="y"]), so a preset with no data-theme
 * attribute at all would silently match nothing.
 */
export function ThemeProvider({ preset = 'hi-vis', mode, theme, children }: ThemeProviderProps) {
  const systemScheme = useSyncExternalStore(
    subscribeToSystemScheme,
    getSystemScheme,
    () => 'light',
  );
  const resolvedMode = mode ?? systemScheme;

  return (
    <div data-preset={preset} data-theme={resolvedMode} style={toCssVars(theme ?? {})}>
      {children}
    </div>
  );
}

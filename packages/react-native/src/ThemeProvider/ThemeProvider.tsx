import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import {
  themes,
  type Theme,
  type ThemeMode,
  type ThemeOverride,
  type ThemePreset,
} from '@valence/tokens';

const DEFAULT_PRESET: ThemePreset = 'hi-vis';

/** The theme a component sees via useTheme() with no wrapping ThemeProvider. */
export const DEFAULT_THEME: Theme = themes[DEFAULT_PRESET].light;

const ThemeContext = createContext<Theme>(DEFAULT_THEME);

export interface ThemeProviderProps {
  /** Selects one of the built-in presets. Defaults to 'hi-vis' for each provider. */
  preset?: ThemePreset;
  /** Defaults to the OS color scheme (react-native's useColorScheme). */
  mode?: ThemeMode;
  /** Color token overrides for this subtree — e.g. a client's brand colors. */
  theme?: ThemeOverride;
  children: ReactNode;
}

export const ThemeProvider = ({
  preset = DEFAULT_PRESET,
  mode,
  theme,
  children,
}: ThemeProviderProps) => {
  const systemScheme = useColorScheme();
  const resolvedMode: ThemeMode = mode ?? (systemScheme === 'dark' ? 'dark' : 'light');
  const value = useMemo(
    () => ({ ...themes[preset][resolvedMode], ...theme }) as Theme,
    [preset, resolvedMode, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): Theme => {
  return useContext(ThemeContext);
};

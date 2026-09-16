import { useFonts } from 'expo-font';
import geistRegular from '@valence/tokens/fonts/Geist-Regular.ttf';
import geistSemibold from '@valence/tokens/fonts/Geist-SemiBold.ttf';
import geistBold from '@valence/tokens/fonts/Geist-Bold.ttf';
import geistMonoSemibold from '@valence/tokens/fonts/GeistMono-SemiBold.ttf';

/**
 * Loads the Geist weights the design system actually uses (400, 600, 700).
 * Call this once at the app root and don't render until it returns true —
 * RN has no font-fallback swap like the web's font-display:swap, so text
 * renders in the system font (silently wrong) until this resolves.
 */
export function useValenceFonts(): boolean {
  const [loaded] = useFonts({
    'Geist-Regular': geistRegular,
    'Geist-SemiBold': geistSemibold,
    'Geist-Bold': geistBold,
    'GeistMono-SemiBold': geistMonoSemibold,
  });
  return loaded;
}

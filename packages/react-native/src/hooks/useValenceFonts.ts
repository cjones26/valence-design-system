import { useFonts } from 'expo-font';
import geistRegular from '@valence/tokens/fonts/Geist-Regular.ttf';
import geistSemibold from '@valence/tokens/fonts/Geist-SemiBold.ttf';
import geistBold from '@valence/tokens/fonts/Geist-Bold.ttf';
import geistMonoSemibold from '@valence/tokens/fonts/GeistMono-SemiBold.ttf';

export function useValenceFonts(): boolean {
  const [loaded] = useFonts({
    'Geist-Regular': geistRegular,
    'Geist-SemiBold': geistSemibold,
    'Geist-Bold': geistBold,
    'GeistMono-SemiBold': geistMonoSemibold,
  });

  return loaded;
}

import type { TextStyle } from 'react-native';

export const GEIST = {
  regular: { fontFamily: 'Geist-Regular', fontWeight: '400' },
  semibold: { fontFamily: 'Geist-SemiBold', fontWeight: '600' },
  bold: { fontFamily: 'Geist-Bold', fontWeight: '700' },
  monoSemibold: { fontFamily: 'GeistMono-SemiBold', fontWeight: '600' },
} satisfies Record<string, Pick<TextStyle, 'fontFamily' | 'fontWeight'>>;

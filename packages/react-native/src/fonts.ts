import type { TextStyle } from 'react-native';

// RN selects among static (non-variable) font files by exact family name,
// not by fontWeight — each weight bundled in useValenceFonts.ts needs its
// own name here to actually render as that weight rather than falling back
// to the system font's synthesized bold. Weight is paired with family here
// (not read dynamically from the theme) because every call site already
// knows statically which tier it wants.
export const GEIST = {
  regular: { fontFamily: 'Geist-Regular', fontWeight: '400' },
  semibold: { fontFamily: 'Geist-SemiBold', fontWeight: '600' },
  bold: { fontFamily: 'Geist-Bold', fontWeight: '700' },
  monoSemibold: { fontFamily: 'GeistMono-SemiBold', fontWeight: '600' },
} satisfies Record<string, Pick<TextStyle, 'fontFamily' | 'fontWeight'>>;

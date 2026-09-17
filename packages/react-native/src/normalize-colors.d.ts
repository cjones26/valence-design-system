// Ships no types of its own — used only by colorMix.ts. Returns an
// unsigned 32-bit 0xRRGGBBAA int, or null/undefined if unparseable.
declare module '@react-native/normalize-colors' {
  export default function normalizeColor(color: string): number | null | undefined;
}

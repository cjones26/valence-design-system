import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia at all — ThemeProvider's system
// color-scheme resolution needs a default stub so tests that don't care
// about it (i.e. almost all of them) don't crash. Tests that do care
// override window.matchMedia locally.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

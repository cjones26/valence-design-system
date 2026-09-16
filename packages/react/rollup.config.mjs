import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';

// Declarations are emitted separately by `tsc` (see package.json build
// script) — this build is just the JS bundle + extracted CSS. Rollup is used
// directly (not Vite) specifically so font url()s in the CSS get copied as
// real files via postcss-url's `copy` mode — Vite's library mode
// unconditionally base64-inlines every CSS asset with no way to opt out.
export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom', 'react/jsx-runtime', '@valence/tokens', '@valence/types'],
  output: {
    file: 'dist/index.js',
    format: 'es',
  },
  plugins: [
    esbuild({ target: 'es2022', jsx: 'automatic' }),
    postcss({
      extract: 'index.css',
      to: 'dist/index.css',
      modules: { generateScopedName: '[name]_[local]_[hash:6]' },
      plugins: [postcssImport(), postcssUrl({ url: 'copy', assetsPath: 'fonts', useHash: true })],
    }),
  ],
};

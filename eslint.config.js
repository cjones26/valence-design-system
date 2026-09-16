// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const nodeGlobals = { console: 'readonly', process: 'readonly', __dirname: 'readonly' };
const typescriptFiles = ['**/*.{ts,tsx,mts,cts}'];
const typescriptConfigs = tseslint.configs.recommended.map((config) => ({
  ...config,
  files: config.files ?? typescriptFiles,
}));
const reactRecommendedRules = Object.fromEntries(
  Object.entries(react.configs.recommended.rules).filter(([name]) => name !== 'react/react-in-jsx-scope'),
);

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/storybook-static/**',
      '**/.rnstorybook/storybook.requires.ts',
    ],
  },
  js.configs.recommended,
  ...typescriptConfigs,
  {
    files: ['**/*.mjs', '**/*.cjs', '**/build.mjs', 'scripts/**/*.js', '**/metro.config.js'],
    languageOptions: { globals: { ...nodeGlobals, module: 'writable', require: 'readonly' } },
  },
  {
    files: ['packages/react/**/*.{ts,tsx}'],
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    rules: {
      ...reactRecommendedRules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['packages/react-native/**/*.{ts,tsx}', 'apps/**/*.{ts,tsx}'],
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...reactRecommendedRules,
      ...reactHooks.configs.recommended.rules,
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
  },
  {
    files: typescriptFiles,
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
);

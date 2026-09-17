const path = require('path');

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.tsx'],
  coverageThreshold: { global: { lines: 70, functions: 70, branches: 60, statements: 70 } },
  // @react-native/jest-preset resolves react-native relative to its own
  // location, not this project's — under pnpm that can pick a different
  // react-native (and thus a different react) than the rest of this package
  // uses, causing duplicate-React "invalid hook call" errors. Re-anchor it.
  moduleNameMapper: {
    '^react-native($|/.*)': `${path.dirname(require.resolve('react-native/package.json'))}/$1`,
  },
  // pnpm nests real paths as node_modules/.pnpm/<pkg>/node_modules/<pkg>,
  // which breaks the preset's default ignore lookahead. See jestjs/jest#12984.
  transformIgnorePatterns: ['node_modules/(?!\\.pnpm/|(?:(?:jest-)?react-native|@react-native)/)'],
};

const path = require('path');

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.tsx'],
  coverageThreshold: { global: { lines: 70, functions: 70, branches: 60, statements: 70 } },
  moduleNameMapper: {
    '^react-native($|/.*)': `${path.dirname(require.resolve('react-native/package.json'))}/$1`,
  },
  transformIgnorePatterns: ['node_modules/(?!\\.pnpm/|(?:(?:jest-)?react-native|@react-native)/)'],
};

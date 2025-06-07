const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/utils/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/_*.{js,jsx,ts,tsx}',
    '!**/node_modules/**'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: { global: { branches: 10, functions: 10, lines: 10, statements: 10 } },
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'reports/junit', outputName: 'junit.xml' }]
  ]
});

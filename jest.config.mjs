export default {
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    // ... any module name mappings
  },
  // ... any other configurations
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage',
  // You can also specify which files to include or exclude for coverage
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.test.tsx',
    // add more patterns as needed
  ],
  // ... any other configurations
};

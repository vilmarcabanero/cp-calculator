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
};

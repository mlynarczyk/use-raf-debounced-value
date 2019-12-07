// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFiles: ['./jest.before-all.js'],
  setupFilesAfterEnv: ['./jest.before-each.js'],
  testMatch: ['**/*.tests.(js|jsx|ts|tsx)'],
};

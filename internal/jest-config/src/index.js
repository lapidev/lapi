/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  collectCoverageFrom: ['./src/**'],
  coverageReporters: ['json', 'html', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: './test',
  testMatch: ['**/*.spec.(ts|tsx|js|jsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': '@swc/jest',
  },
  verbose: true,
};

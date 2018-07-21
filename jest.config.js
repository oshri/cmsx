module.exports = {
    testEnvironment: 'node',
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node",
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'server/**/*.{ts,tsx,js,jsx}',
      '!server/**/*.d.ts',
    ],
  };
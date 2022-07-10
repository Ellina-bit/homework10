module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/specs/*.spec.*'],
  globals: {
    testTimeout: 50000,
  },
  reporters: [
    'default',
    ['jest-html-reporters', {
      filename: 'report.html',
      openReport: true,
    }],
  ],
  verbose: true,
};

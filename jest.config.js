module.exports = {
  preset: '@wordpress/jest-preset-default',
  setupFilesAfterEnv: ["jest-extended"],
  roots: [
    '<rootDir>/src',
    '<rootDir>/blocks',
  ],
  testMatch: [
    '**/__tests__/**/*test.+(ts|tsx|js|jsx)',
    '**/?(*.)+(spec|test).+(ts|tsx|js|jsx)',
  ],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};

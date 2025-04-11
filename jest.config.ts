export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1', // 💡 ici tu fais correspondre l'alias
        '^generated/(.*)$': '<rootDir>/generated/$1',
    },
    testEnvironment: 'node',
  };
  
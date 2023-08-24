'use strict';

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ['ts', 'js', 'html'],
  modulePaths: ["<rootDir>"],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  transformIgnorePatterns: [ 'node_modules/(?!.*\\.mjs$|ng2-charts|@angular|lodash-es)' ],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    'chart.js': '<rootDir>node_modules/chart.js/dist/chart.mjs',
    '^@core/(.*)': '<rootDir>/src/app/core/$1',
    '^@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '^@features/(.*)': '<rootDir>/src/app/features/$1',
  },
  maxWorkers: '50%',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
};


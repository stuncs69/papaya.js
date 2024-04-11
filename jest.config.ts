import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest', 
    testEnvironment: 'node',
    testMatch: [
        "<rootDir>/tests/**/*.ts",
        "<rootDir>/tests/**/*.tsx"
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};

export default config;
/**
 * For a detailed explanation regarding each configuration property and type check, visit:
 * @see https://jestjs.io/docs/configuration
 */
export const config = {
    // bail: 0,
    clearMocks: true,
    collectCoverage: true,
    // collectCoverageFrom: undefined,
    coverageDirectory: "coverage",
    // coveragePathIgnorePatterns: [
    //   "/node_modules/"
    // ],
    coverageProvider: "v8",
    coverageReporters: ["json", "lcov", "clover"],
    // globalSetup: undefined,
    // globalTeardown: undefined,
    // globals: {},
    // moduleDirectories: [
    //   "node_modules"
    // ],
    // A preset that is used as a base for Jest's configuration
    preset: "ts-jest",
    // projects: undefined,
    // reporters: undefined,
    // runner: "jest-runner",
    // setupFiles: [],
    // setupFilesAfterEnv: [],
    // slowTestThreshold: 5,
    // snapshotSerializers: [],
    testEnvironment: "jest-environment-node",
    testMatch: ["**/*.(spec|test).[jt]s?(x)"],
    testRunner: "jest-circus/runner",
    // transform: undefined,
    // transformIgnorePatterns: [
    //   "/node_modules/",
    //   "\\.pnp\\.[^\\/]+$"
    // ],
    // verbose: undefined,
    // watchPathIgnorePatterns: [],
};

export default config;

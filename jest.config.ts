import { Config } from "jest";

/**
 * For a detailed explanation regarding each configuration property and type check, visit:
 * @see https://jestjs.io/docs/configuration
 */
export const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: ["json", "lcov", "clover"],
    injectGlobals: false,
    preset: "ts-jest",
    testEnvironment: "jest-environment-node",
    testMatch: ["**/src/*.(spec|test).[jt]s?(x)"],
    testRunner: "jest-circus/runner",
};

export default config;

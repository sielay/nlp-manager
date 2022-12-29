/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", ".d.ts", ".d.tsx"],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    './src/**/*.tsx'
  ],
  coveragePathIgnorePatterns: ["/node_modules/", ".js", ".jsx", "./src/types", 'index.ts'],
};

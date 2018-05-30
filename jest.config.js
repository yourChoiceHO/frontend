module.exports = {
  displayName: "your-choice",
  testPathIgnorePatterns: ["/node_modules/"],
  testURL: "http://localhost:3000/",
  // testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "@/(.*)$": "<rootDir>/src/$1"
  },
  setupTestFrameworkScriptFile: "<rootDir>/test/setup.ts"
};

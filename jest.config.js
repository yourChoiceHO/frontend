module.exports = {
  displayName: "your-choice",
  testPathIgnorePatterns: ["/node_modules/"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  }
};

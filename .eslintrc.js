module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["next/core-web-vitals"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "@next/next/no-img-element": "off",
  },
};

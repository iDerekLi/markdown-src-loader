module.exports = {
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "plugin:prettier/recommended",
    "prettier"
  ],
  plugins: [
    "prettier"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};

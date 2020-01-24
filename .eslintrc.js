module.exports = {
  env: {
    "jest/globals": true
  },
  extends: "airbnb",
  plugins: ["prettier", "jest"],
  rules: {
    semi: [1, "never"],
    quotes: [1, "double"],
    "no-console": "off",
    "space-before-function-paren": "off",
    "prettier/prettier": "error",
    "comma-dangle": ["error", "never"]
  },
  settings: {
    "import/resolver": {
      node: { extensions: [".js", ".mjs"] }
    }
  }
}

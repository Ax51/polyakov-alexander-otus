const parentRules = require("../../.eslintrc");

module.exports = {
  ...parentRules,
  env: {
    node: false,
    browser: true
  }
};

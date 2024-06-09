/*eslint-env es6*/
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  plugins: [
    new ESLintPlugin({
      extensions: ["ts", "html"],
      lintDirtyModulesOnly: false,
      emitWarning: true,
      emitError: true,
      failOnWarning: false,
      failOnError: true,
    }),
  ],
};

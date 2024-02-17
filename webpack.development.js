const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require('path');

module.exports = merge(common, {
  watchOptions: {
    poll: true
  },
  watch: true,
  mode: 'development',
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  output: {
    filename: '[name].bundle.js',
    // I couldn't figure out how to get Spring Boot or Intellij to deploy changed webpack bundles instantaneously
    // so we just have webpack deploy directly into the build folder here.
    path: path.resolve(__dirname, 'build/resources/main/static/bundles')
  },
  stats: {
    errorDetails: true
  }
});
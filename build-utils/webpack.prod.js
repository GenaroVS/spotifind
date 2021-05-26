const CompressionPlugin = require("compression-webpack-plugin");

module.exports = () => ({
  mode: 'production',
  devtool: 'source-map',
  plugins: [new CompressionPlugin()]
});
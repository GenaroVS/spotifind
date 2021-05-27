const CompressionPlugin = require("compression-webpack-plugin");

module.exports = () => ({
  mode: 'production',
  devtool: 'source-map',
  plugins: [new CompressionPlugin()],
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
        },
      },
    }
  }
});
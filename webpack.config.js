const path = require('path')

const src = path.resolve('./client/index.js')
const dist = path.resolve('./public')

module.exports = {
  mode: 'development',
  entry: src,
  output: {
    filename: 'bundle.js',
    path: dist
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }]
  },
  devServer: {
    contentBase: dist,
    port: 8080,
    proxy: {
      '/api': {
        target: {
          host: '127.0.0.1',
          protocol: 'http:',
          port: 3000
        },
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
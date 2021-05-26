const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const src = path.resolve('./client/index.js')
const dist = path.resolve('./public')
const webpackMerge = require("webpack-merge");
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const loadPresets = require('./build-utils/loadPresets.js');

module.exports = ({ mode, presets } = { mode: "prod", presets: [] }) => {
  return webpackMerge({
      entry: src,
      output: {
        filename: 'bundle.js',
        path: dist,
        clean: true
      },
      module: {
        rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
                'babel-plugin-styled-components'
              ]
            }
          }
        }]
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Spotifind',
          template: './client/base.html'
        })
      ]
    },
    modeConfig(mode),
    loadPresets({ mode, presets })
  )
}
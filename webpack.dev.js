const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path')
const dist = path.resolve('./public')

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   watch: true
/*    devServer: {
    contentBase: dist,
    port: 8080,
    proxy: [
      {
        context: ['/user', '/api', '/login', '/auth'],
        target: {
          host: '127.0.0.1',
          protocol: 'http:',
          port: 3000
        }
      },
    ],
  } */
 });
const path = require('path')
const dist = path.resolve('./public')

module.exports = () => ({
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
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
var webpackTapeRun = require('webpack-tape-run')
var path = require('path')

module.exports = {
  entry: {
    'smoke': './smoke.test.js',
  },
  context: path.join(__dirname, 'test'),

  node: {
    fs: 'empty',
  },

  output: {
    filename: '[name].test.js',
    path: path.join(__dirname, 'dist'),
  },

  plugins: [
    new webpackTapeRun({
      tapeRun: {
        browser: 'electron',
        keepOpen: false,
      },
      reporter: 'tap-spec',
    }),
  ],

  stats: 'errors-only',
}

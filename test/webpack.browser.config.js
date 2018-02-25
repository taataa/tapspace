var LiveReloadPlugin = require('webpack-livereload-plugin')
var path = require('path')

module.exports = {
  entry: {
    'index': './index.test.js'
  },
  context: __dirname,

  node: {
    fs: 'empty' // otherwise require('tape') throws
  },

  output: {
    filename: '[name].test.js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    loaders: [
      // Due to problems in serving static files with tape-run,
      // we import images as data URLs.
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },

  plugins: [
    new LiveReloadPlugin()
  ],

  devtool: 'eval-source-map',

  stats: 'minimal'
}

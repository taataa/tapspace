var WebpackTapeRun = require('webpack-tape-run')
var path = require('path')

module.exports = {
  entry: {
    'index': './index.test.js'
  },
  context: __dirname,

  node: {
    fs: 'empty'  // otherwise require('tape') throws
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
    new WebpackTapeRun({
      tapeRun: {
        browser: 'electron'
        // port: 8000,
        // node: true,  // allows fs
        // keepOpen: false,
        // static: path.join(__dirname, 'lib'),
        // basedir: path.join(__dirname, 'dist'),
      },
      reporter: 'tap-spec'
    })
  ],

  devtool: 'eval-source-map',

  stats: 'minimal'
}

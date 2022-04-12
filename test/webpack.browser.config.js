const webpack = require('webpack')
const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: {
    index: './index.test.js'
  },
  context: __dirname,

  output: {
    filename: '[name].test.js',
    path: path.join(__dirname, 'dist')
  },

  mode: 'development',
  target: 'web',

  // Provide some Nodejs libs for tape to work.
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js'],
    fallback: {
      fs: false,
      buffer: false,
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify')
    }
  },

  module: {
    rules: [
      {
        // Due to problems in serving static files with tape-run,
        // we import images as data URLs. Thus asset/inline.
        test: /\.(png|jpg|gif)$/,
        type: 'asset/inline'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        options: {
          esModule: false // enable CommonJS modules.
        }
      }
    ]
  },

  plugins: [
    // Provide process module for tape to work.
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    // Rerun the test after each build in watch mode.
    new LiveReloadPlugin()
  ],

  devtool: 'eval-source-map',

  stats: 'minimal'
}

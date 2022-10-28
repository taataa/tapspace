var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './index',
  output: {
    filename: 'tapspace.min.js',
    path: path.join(__dirname, '/dist'),
    sourceMapFilename: '[file].map',
    library: 'tapspace',  // module name in global scope
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },

  mode: 'development'
}

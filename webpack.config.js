var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './index',
  output: {
    filename: 'affinedom.min.js',
    path: path.join(__dirname, '/dist'),
    sourceMapFilename: '[file].map',
    library: 'affinedom',  // module name in global scope
    libraryTarget: 'umd'
  },

  mode: 'development'
}

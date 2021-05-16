var AbstractPlane = require('./AbstractPlane')
var extend = require('extend')

var Fractal = function (fractalModule, opts) {
  AbstractPlane.call(this)

  // opts.rootPath, default ''
  // opts.visibilityDown, default ''
  // opts.visibilityUp, default ''

  // var createChild = function () {
  //   // Create a placeholder for a child module.
  // }
  //
  // fractalModule(path, createChild)
}

var p = extend({}, AbstractPlane.prototype)
Fractal.prototype = p

module.exports = Fractal

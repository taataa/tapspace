var EPSILON = require('./epsilon')

var Size = function (width, height) {
  // Parameters:
  //   width
  //     number
  //   height
  //     number
  //
  if (typeof height === 'undefined') {
    throw new Error('Missing (width, height) parameters')
  }
  this.width = width
  this.height = height
}

var proto = Size.prototype

proto.almostEqual = function (size) {
  return Math.abs(this.width - size.width)
    + Math.abs(this.height - size.height) < EPSILON
}

proto.equal = function (size) {
  return (this.width === size.width && this.height === size.height)
}

proto.getHeight = function () {
  return this.height
}

proto.getWidth = function () {
  return this.width
}

proto.transform = function (tr) {
  // Transform the Size. Only scaling affects to the size.
  //
  // Parameters:
  //   tr
  //     a Transform
  //
  var s = tr.getScale()
  var w = this.width * s
  var h = this.height * s
  return new Size(w, h)
}

module.exports = Size

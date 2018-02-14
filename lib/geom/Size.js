var EPSILON = require('./epsilon')

var Size = function (width, height) {
  // Parameters:
  //   width
  //     number, must be 0 or positive
  //   height
  //     number, must be 0 or positive
  //
  if (typeof width !== 'number' || typeof height !== 'number') {
    throw new Error('Missing or invalid (width, height) parameters')
  }
  if (width < 0 || height < 0) {
    throw new Error('Width and height must be zero or positive.')
  }

  this.width = width
  this.height = height
}

var proto = Size.prototype

proto.almostEqual = function (size) {
  return Math.abs(this.width - size.width) +
    Math.abs(this.height - size.height) < EPSILON
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

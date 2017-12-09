
var SpacePoint = require('./SpacePoint')
var SpaceTransformer = require('./SpaceTransformer')
var extend = require('extend')

var SpaceRectangle = function () {
  // A rectangular area in space.
  //
  SpaceTransformer.call(this)

  // Rectangles have size.
  // In its own coordinates, rectangle's right bottom corner
  // is located at [width, height].
  // By default transformation, width 1 and height 1 equal to 1 space unit.
  this._width = 1
  this._height = 1
}

var p = extend({}, SpaceTransformer.prototype)
SpaceRectangle.prototype = p

p.atNorm = function (xy) {
  // Return a SpacePoint by coordinates normalized about the size.
  // atNorm([1,0]) returns the point at the right upper corner.
  return new SpacePoint(this, [this._width * xy[0], this._height * xy[1]])
}

p.atMid = function () {
  return new SpacePoint(this, [this._width / 2, this._height / 2])
}

p.atMidN = function () {
  return new SpacePoint(this, [this._width / 2, 0])
}

p.atMidW = function () {
  return new SpacePoint(this, [0, this._height / 2])
}

p.atMidE = function () {
  return new SpacePoint(this, [this._width, this._height / 2])
}

p.atMidS = function () {
  return new SpacePoint(this, [this._width / 2, this._height])
}

p.atNW = function () {
  return new SpacePoint(this, [0, 0])
}

p.atNE = function () {
  return new SpacePoint(this, [this._width, 0])
}

p.atSW = function () {
  return new SpacePoint(this, [0, this._height])
}

p.atSE = function () {
  return new SpacePoint(this, [this._width, this._height])
}

p.getSize = function () {
  return [this._width, this._height]
}

p.resize = function (dimensions) {
  // Parameter
  //   dimensions, [width, height]
  this._width = dimensions[0]
  this._height = dimensions[1]

  this.emit('resized', this)
}

module.exports = SpaceRectangle

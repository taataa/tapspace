
var InvariantVector = require('./InvariantVector')
var SpaceTransformer = require('./SpaceTransformer')
var Vector = require('./Vector')
var InvariantPath = require('./InvariantPath')
var Path = require('./Path')
var extend = require('extend')

var SpaceRectangle = function () {
  // A rectangular area in space.
  //
  SpaceTransformer.call(this)

  // Rectangles have size. We represent the size as a diagonal vector.
  // In its own coordinates, rectangle's right bottom corner
  // is located at _diag.
  // By default transformation, width 1 and height 1 equal to 1 space unit.
  this._diag = new Vector(1, 1)
}

var p = extend({}, SpaceTransformer.prototype)
SpaceRectangle.prototype = p

p.atNorm = function (x, y) {
  // Return an InvariantVector by coordinates normalized about the size.
  // atNorm(1, 0) returns the point at the right upper corner.
  return new InvariantVector(
    new Vector(this._diag.x * x, this._diag.y * y),
    this
  )
}

p.atMid = function () {
  return new InvariantVector(this._diag.multiply(0.5), this)
}

p.atMidN = function () {
  return new InvariantVector(new Vector(this._diag.x / 2, 0), this)
}

p.atMidW = function () {
  return new InvariantVector(new Vector(0, this._diag.y / 2), this)
}

p.atMidE = function () {
  return new InvariantVector(new Vector(this._diag.x, this._diag.y / 2), this)
}

p.atMidS = function () {
  return new InvariantVector(new Vector(this._diag.x / 2, this._diag.y), this)
}

p.atNW = function () {
  return new InvariantVector(new Vector(0, 0), this)
}

p.atNE = function () {
  return new InvariantVector(new Vector(this._diag.x, 0), this)
}

p.atSW = function () {
  return new InvariantVector(new Vector(0, this._diag.y), this)
}

p.atSE = function () {
  return new InvariantVector(new Vector(this._diag.x, this._diag.y), this)
}

p.fit = function (ipa) {
  // Scale and translate to fit around ipa.
  //
  // Parameters:
  //   ipa
  //     InvariantPath, SpaceRectangle, or SpaceGroup
  //
  // Emits:
  //   transformed
  //
  var domain = new InvariantPath(this.getHull().to(this).getBounds(), this)
  var target = new InvariantPath(ipa.getHull().to(this).getBounds(), this)
  return this.translateScale(domain, target)
}

p.getHull = function () {
  // Get bounding InvariantPath
  //
  return new InvariantPath(new Path([
    new Vector(0, 0),
    new Vector(this._diag.x, 0),
    new Vector(this._diag.x, this._diag.y),
    new Vector(0, this._diag.y)
  ]), this)
}

p.getLocalSize = function () {
  // Get size as Vector v in units of its own coordinate plane.
  // Note, v.x equals width, v.y equals height.
  return new Vector(this._diag.x, this._diag.y)
}

p.getSize = function () {
  // Get size as InvariantVector diagonal. Handy if you need the size in
  // global unitsor in units of another plane.
  return new InvariantVector(new Vector(this._diag.x, this._diag.y), this)
}

p.setSize = function (invariantDiagonal) {
  // Set rectangle dimensions. InvariantVector takes care of
  // required coordinate transformations. Handy if you want
  // two rectangles to have globally equal size.
  //
  // Parameter
  //   invariantDiagonal
  //     InvariantVector
  //
  this._diag = invariantDiagonal.to(this)
  this.emit('resized', this)

  return this
}

p.setLocalSize = function (diagonal) {
  // Set size of the rectangle in units of its own plane.
  //
  // Parameter
  //   diagonal
  //     Vector(width, height)
  //
  this._diag = diagonal
  this.emit('resized', this)

  return this
}

module.exports = SpaceRectangle

var Vector = require('./Vector')

var Rectangle = function (w, h) {
  // Parameters:
  //   w
  //     width
  //   h
  //     height
  if (typeof h === 'undefined') {
    throw new Error('Missing (w, h) parameters')
  }
  this.w = w
  this.h = h
}

var proto = Rectangle.prototype

proto.atMid = function () {
  return new Vector(this.w / 2, this.h / 2)
}

proto.atMidTop =
proto.atMidN = function () {
  return new Vector(this.w / 2, 0)
}

proto.atMidLeft =
proto.atMidW = function () {
  return new Vector(0, this.h / 2)
}

proto.atMidRight =
proto.atMidE = function () {
  return new Vector(this.w, this.h / 2)
}

proto.atMidBottom =
proto.atMidS = function () {
  return new Vector(this.w / 2, this.h)
}

proto.atNorm = function (x, y) {
  // Return a Vector from coordinates normalized about the width and height.
  // atNorm(1, 0) returns the point at the right upper corner.
  return new Vector(this.w * x, this.h * y)
}

proto.atLeftTop =
proto.atNW = function () {
  return new Vector(0, 0)
}

proto.atRightTop =
proto.atNE = function () {
  return new Vector(this.w, 0)
}

proto.atLeftBottom =
proto.atSW = function () {
  return new Vector(0, this.h)
}

proto.atRightBottom =
proto.atSE = function () {
  return new Vector(this.w, this.h)
}

proto.equal =
proto.equals = function (rect) {
  return (this.w === rect.w && this.h === rect.h)
}

proto.getDiagonal = function () {
  return new Vector(this.w, this.h)
}

proto.scale = function (multiplier) {
  return new Rectangle(this.w * multiplier, this.h * multiplier)
}

proto.toArray = function () {
  return [this.w, this.h]
}

module.exports = Rectangle

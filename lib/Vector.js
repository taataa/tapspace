
var Vector = function (x, y) {
  if (typeof y === 'undefined') {
    throw new Error('Missing (x, y) parameters')
  }
  this.x = x
  this.y = y
}

var proto = Vector.prototype

proto.add = function (vec) {
  return new Vector(this.x + vec.x, this.y + vec.y)
}

proto.distance = function (vec) {
  var dx = this.x - vec.x
  var dy = this.y - vec.y
  return Math.sqrt(dx * dx + dy * dy)
}

proto.equals = function (vec) {
  return (this.x === vec.x && this.y === vec.y)
}

proto.opposite = function () {
  return new Vector(-this.x, -this.y)
}

proto.max = function (vec) {
  // Maximum of two vectors
  var x = Math.max(this.x, vec.x)
  var y = Math.max(this.y, vec.y)
  return new Vector(x, y)
}

proto.min = function (vec) {
  // Minimum of two vectors
  var x = Math.min(this.x, vec.x)
  var y = Math.min(this.y, vec.y)
  return new Vector(x, y)
}

proto.multiply = function (scalar) {
  return new Vector(this.x * scalar, this.y * scalar)
}

proto.norm = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y)
}

proto.offset = function (dx, dy) {
  // Cartesian offset
  return new Vector(this.x + dx, this.y + dy)
}

proto.polarOffset = function (radius, radians) {
  // Create a new Vector where the point is moved by the polar coordinates
  //
  // Parameters:
  //   radius
  //   radians
  var x = this.x + radius * Math.cos(radians)
  var y = this.y + radius * Math.sin(radians)
  return new Vector(x, y)
}

proto.rotate = function (radians) {
  var x = this.x * Math.cos(radians) - this.y * Math.sin(radians)
  var y = this.x * Math.sin(radians) + this.y * Math.cos(radians)
  return new Vector(x, y)
}

proto.subtract = function (vec) {
  return new Vector(this.x - vec.x, this.y - vec.y)
}

proto.toArray = function () {
  return [this.x, this.y]
}

proto.transform = function (tr) {
  // Multiply the vector from left: result = tr * this
  //
  // Parameters:
  //   tr
  //     a Transform
  //
  var x = this.x * tr.s - this.y * tr.r + tr.tx
  var y = this.x * tr.r + this.y * tr.s + tr.ty
  return new Vector(x, y)
}

module.exports = Vector

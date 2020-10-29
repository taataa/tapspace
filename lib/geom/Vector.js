var EPSILON = require('./epsilon')

var Vector = function (x, y) {
  if (typeof y === 'undefined') {
    throw new Error('Missing (x, y) parameters')
  }
  this.x = x
  this.y = y
}

Vector.createFromPolar = function (magnitude, direction) {
  // Parameters
  //   magnitude
  //     number
  //   direction
  //     number, angle in radians
  //
  return new Vector(
    magnitude * Math.cos(direction),
    magnitude * Math.sin(direction)
  )
}

Vector.mean = function (vlist) {
  // Average of the listed Vectors.
  //
  var i
  var len = vlist.length
  var sumx = 0
  var sumy = 0
  if (len > 0) {
    for (i = 0; i < len; i += 1) {
      sumx += vlist[i].x
      sumy += vlist[i].y
    }
    return new Vector(sumx / len, sumy / len)
  }
  throw new Error('Cannot compute mean for an empty list of vectors.')
}

var proto = Vector.prototype

proto.add = function (vec) {
  return new Vector(this.x + vec.x, this.y + vec.y)
}

proto.almostEqual = function (v) {
  return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) < EPSILON
}

proto.changeBasis = function (vi, vj) {
  // Change of basis given new basis vectors.
  // The returned vector becomes represented in a coordinate space
  // where vi and vj are the basis vectors.
  //
  // Let vx and vy be current basis vectors.
  // Let a*vx + b*vy = c*vi + d*vj
  // Let vi = g*vx + f*vy
  // Let vj = h*vx + k*vy
  // Let vx = (1,0), vy = (0,1)
  //
  // Solve for c, d.
  //   (a, b) = c*g*(1,0) + c*f*(0,1) + d*h*(1,0) + d*k*(0,1)
  //          = (c*g + d*h, c*f + d*k)
  //
  //   c = (b*h - a*k) / (f*h - g*k)
  //   d = (a*f - b*g) / (f*h - g*k)
  //
  // Note
  //   a = this.x
  //   b = this.y
  //   g = vi.x
  //   f = vi.y
  //   h = vj.x
  //   k = vj.y
  //

  // (f*h - g*k) != 0
  var denom = vi.y * vj.x - vi.x * vj.y
  if (Math.abs(denom) < EPSILON) {
    throw new Error('Basis vectors must be linearly independent.')
  }

  return new Vector(
    (this.y * vj.x - this.x * vj.y) / denom,
    (this.x * vi.y - this.y * vi.x) / denom
  )
}

proto.changeFromBasis = function (vi, vj) {
  // Opposite of changeBasis:
  //   vb = v.changeBasis(vi, vj)
  //   v === vb.changeFromBasis(vi, vj)
  //
  // Equivalent to
  //   this.changeBasis(
  //     (new Vector(1, 0)).changeBasis(vi, vj),
  //     (new Vector(0, 1)).changeBasis(vi, vj)
  //   )
  //
  // Simple to solve:
  //   this.x is the number of vi vectors and
  //   this.y is the number of vj vectors.
  //   Therefore result is this.x * vi + this.y * vj
  //
  var denom = vi.y * vj.x - vi.x * vj.y
  if (Math.abs(denom) < EPSILON) {
    throw new Error('Basis vectors must be linearly independent.')
  }

  return new Vector(
    this.x * vi.x + this.y * vj.x,
    this.x * vi.y + this.y * vj.y
  )
}

proto.distance = function (vec) {
  var dx = this.x - vec.x
  var dy = this.y - vec.y
  return Math.sqrt(dx * dx + dy * dy)
}

proto.equal =
proto.equals = function (vec) {
  return (this.x === vec.x && this.y === vec.y)
}

proto.getRotation = function () {
  return Math.atan2(this.y, this.x)
}

proto.getMagnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y)
}

proto.isIndependent = function (v) {
  // Return true if the two vectors are linearly independent.
  return this.x * v.y - this.y * v.x !== 0
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

proto.translate =
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

proto.rotate = function (radians, pivot) {
  // Rotate about optional pivot.
  //
  // Parameters:
  //   radians: angle
  //   pivot: a Vector or VectorLiteral, defaults to (0, 0)
  //
  if (typeof pivot === 'undefined') {
    pivot = { x: 0, y: 0 }
  }
  // Put relative to pivot
  var x = this.x - pivot.x
  var y = this.y - pivot.y
  // Rotate
  var xx = x * Math.cos(radians) - y * Math.sin(radians)
  var yy = x * Math.sin(radians) + y * Math.cos(radians)
  // Put back
  x = xx + pivot.x
  y = yy + pivot.y
  // Create
  return new Vector(x, y)
}

proto.scale = function (factor, pivot) {
  // Scale the vector about an optional pivot.
  //
  // Parameters:
  //   factor: a number
  //   pivot: optional Vector or VectorLiteral, defaults to (0, 0)
  //
  if (typeof pivot === 'undefined') {
    pivot = { x: 0, y: 0 }
  }
  // A vector from pivot to this.
  var x = this.x - pivot.x
  var y = this.y - pivot.y
  // Scale
  x = factor * x
  y = factor * y
  // Put back
  x = x + pivot.x
  y = y + pivot.y
  // Create
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

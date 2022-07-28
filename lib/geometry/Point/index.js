const proj2 = require('affineplane').proj2
const Distance = require('../Distance')

const Point = function (basis, x, y, z) {
  // tapspace.geometry.Point(basis, x, y, z)
  //
  // A 3D point in a space.
  //
  // Parameters
  //   basis
  //     a Component
  //   x
  //     a number
  //   y
  //     a number
  //   z
  //     a number
  //
  // Example
  // ```
  // let p = new tapspace.Point(basis, x, y, z)
  // ```
  //
  this.basis = basis
  this.x = x
  this.y = y
  this.z = z
}

Point.fromAverage = require('./average')(Point)
Point.average = Point.fromAverage
Point.mean = Point.average

const proto = Point.prototype

proto.distanceTo = function (p) {
  // tapspace.geometry.Point:distanceTo(p)
  //
  // Distance between points.
  //
  // Parameters:
  //   p
  //     a Point or {x,y,z}. The latter is assumed to be on the same basis.
  //
  // Return
  //   a Distance
  //

  // Normalize
  if (p.basis) {
    const pr = p.basis.getProjectionTo(this.basis)
    p = proj2.point2(pr, p)
  }

  const dx = p.x - this.x
  const dy = p.y - this.y
  const dz = p.z - this.z
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

  return new Distance(this.basis, dist)
}

proto.offset = function (dx, dy, dz) {
  // tapspace.geometry.Point:offset(dx, dy, dz)
  //
  // Get a point when the current point is offset by dx, dy, and dz.
  //
  // Parameters:
  //   dx
  //     a number of pixels to move horizontally.
  //   dy
  //     a number of pixels to move vertically.
  //   dz
  //     a number of pixels to move deeper.
  //
  // Return
  //   a Point
  //
  return new Point(this.basis, this.x + dx, this.y + dy, this.z + dz)
}

proto.plain = function () {
  // tapspace.geometry.Point:plain()
  //
  // Return plain point3 object {x,y,z} without basis data.
  //
  return {
    x: this.x,
    y: this.y,
    z: this.z
  }
}

proto.polarOffset = require('./polarOffset')

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  // tapspace.geometry.Point:projectTo(newBasis)
  //
  const pr = this.basis.getProjectionTo(newBasis)
  const xy = proj2.point2(pr, this)
  return new Point(newBasis, xy.x, xy.y, xy.z)
}

proto.round = function () {
  // tapspace.geometry.Point:round()
  //
  // Round the point to nearest integers.
  //
  // Return
  //   a Point
  //
  return new Point(
    this.basis,
    Math.round(this.x),
    Math.round(this.y),
    Math.round(this.z)
  )
}

proto.vectorTo = require('./vectorTo')

module.exports = Point

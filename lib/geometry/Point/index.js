const geom = require('affineplane')
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
  //     optional number, default 0
  //
  // Example
  // ```
  // let p = new tapspace.Point(basis, x, y, z)
  // ```
  //
  this.basis = basis
  this.x = x
  this.y = y
  this.z = typeof z === 'number' ? z : 0
}

Point.fromAverage = require('./average')(Point)
Point.fromMean = Point.fromAverage

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
    const pr = p.basis.getTransitionTo(this.basis)
    p = geom.point3.transitFrom(p, pr)
  }

  const dx = p.x - this.x
  const dy = p.y - this.y
  const dz = p.z - this.z
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

  return new Distance(this.basis, dist)
}

proto.offset require('./offset')

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

proto.changeBasis = function (newBasis) {
  // tapspace.geometry.Point:changeBasis(newBasis)
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const xyz = geom.point3.transitFrom(this, tran)
  return new Point(newBasis, xyz.x, xyz.y, xyz.z)
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

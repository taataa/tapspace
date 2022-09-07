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

module.exports = Point
const proto = Point.prototype

// Class methods
Point.fromAverage = require('./fromAverage')(Point)
Point.fromMean = Point.fromAverage

// Instance methods
proto.changeBasis = require('./changeBasis')
proto.distanceTo = require('./distanceTo')
proto.offset = require('./offset')
proto.plain = require('./plain')
proto.polarOffset = require('./polarOffset')
proto.round = require('./round')
proto.vectorTo = require('./vectorTo')

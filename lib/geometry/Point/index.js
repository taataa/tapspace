const Vector = require('../Vector')
const Distance = require('../Distance')

const Point = function (basis, point) {
  // tapspace.geometry.Point(basis, point)
  //
  // A 3D point in a space. This can also be called a 3D position vector.
  // See tapspace.geometry.Vector for a 3D displacement vector.
  //
  // Parameters
  //   basis
  //     a component
  //   point
  //     a object {x,y,z}, the coordinates.
  //
  // Example
  // ```
  // let p = new tapspace.Point(basis, { x: 1, y: 2, z: 3 })
  // ```
  //
  this.basis = basis
  this.point = point

  // Allow init with 2d point
  if (!point.z) {
    this.point.z = 0
  }
}

module.exports = Point
const proto = Point.prototype

// Class methods
Point.fromAverage = require('./fromAverage')(Point)
Point.fromMean = Point.fromAverage

// Instance methods
proto.changeBasis = require('./changeBasis')
proto.distanceTo = require('./distanceTo')(Distance)
proto.offset = require('./offset')
proto.plain = require('./plain')
proto.polarOffset = require('./polarOffset')
proto.projectTo = require('./projectTo')
proto.round = require('./round')
proto.vectorTo = require('./vectorTo')(Vector)

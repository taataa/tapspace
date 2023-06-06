const Vector = require('../Vector')
const Distance = require('../Distance')
const Direction = require('../Direction')

const Point = function (basis, point) {
  // @Point(basis, point)
  //
  // A 3D point in a space. This can also be called a 3D *position vector*.
  // See Vector for a 3D *displacement vector*.
  //
  // Example:
  // ```
  // let p = new tapspace.geometry.Point(basis, { x: 1, y: 2, z: 3 })
  // ```
  //
  // Parameters
  //   basis
  //     a Component
  //   point
  //     an object {x,y,z}, the coordinates.
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
proto.isPoint = true

// Class methods
Point.fromAverage = require('./fromAverage')(Point)
Point.fromMean = Point.fromAverage

// Instance methods
proto.addVector = require('./addVector')
proto.changeBasis = require('./changeBasis')
proto.getDirectionTo = require('./getDirectionTo')(Direction)
proto.getDistanceTo = require('./getDistanceTo')(Distance)
proto.getRaw = require('./getRaw')
proto.getVectorTo = require('./getVectorTo')(Vector)
proto.homothety = require('./homothety')
proto.offset = require('./offset')
proto.polarOffset = require('./polarOffset')
proto.projectTo = require('./projectTo')
proto.round = require('./round')
proto.transformBy = require('./transformBy')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
proto.transitRawOuter = require('./transitRawOuter')
proto.translateBy = require('./translateBy')

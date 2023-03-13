const Distance = function (basis, dist) {
  // @Distance(basis, dist)
  //
  // Distance represents a scalar measure in affine space.
  // In coordinate system transitions, rotations and translations do
  // not affect the distance. Only the scale does.
  //
  // Parameters
  //   basis
  //     a Basis, the frame of reference for the distance.
  //   dist
  //     a number, a measure. Cannot be negative.
  //
  // Properties:
  //   basis
  //   dist
  //
  this.basis = basis
  this.dist = dist
}

module.exports = Distance
const proto = Distance.prototype
proto.isDistance = true

proto.changeBasis = require('./changeBasis')
proto.getNumber = require('./getNumber')
proto.getRaw = require('./getRaw')
proto.isAlmostEqual = require('./isAlmostEqual')
proto.isGreaterThan = require('./isGreaterThan')
proto.isLessThan = require('./isLessThan')
proto.multiply = require('./scaleBy')
proto.projectTo = require('./projectTo')
proto.scaleBy = proto.multiply
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')

// Handle circular dependencies.
const factorGetVector = require('./getVector')
Distance.patchCircular = (Vector) => {
  proto.getVector = factorGetVector(Vector)
  delete Distance.patchCircular // once
}

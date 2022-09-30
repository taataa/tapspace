const Distance = function (basis, d) {
  // tapspace.geometry.Distance(basis, d)
  //
  // Distance represents a scalar measure in affine space.
  // In coordinate system transitions, rotations and translations do
  // not affect the distance. Only the scale does.
  //
  // Parameters
  //   basis
  //     a component, the frame of reference for the distance.
  //   d
  //     number, a measure. Cannot be negative.
  //
  // Properties:
  //   basis
  //   d
  //
  this.basis = basis
  this.d = d
}

module.exports = Distance
const proto = Distance.prototype

proto.changeBasis = require('./changeBasis')
proto.getNumber = require('./getNumber')
proto.multiply = require('./scaleBy')
proto.scaleBy = proto.multiply

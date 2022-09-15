const Direction = function (basis, angle) {
  // tapspace.geometry.Direction(basis, angle)
  //
  // Direction on xy-plane represented as an absolute angle.
  // The representation depends on the orientation of the coordinate space and
  // therefore the angle needs conversion between planes.
  // In contrast, a rotation is a change in the angle and does not depend on
  // the orientation.
  //
  // Parameters
  //   basis
  //     a Component
  //   angle
  //     a number, the rotation in radians from the angle zero.
  //
  this.basis = basis
  this.r = angle
}

module.exports = Direction
const proto = Direction.prototype

proto.changeBasis = require('./changeBasis')

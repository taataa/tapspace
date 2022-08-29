const dir2 = require('affineplane').dir2

const Direction = function (basis, angle) {
  // tapspace.geometry.Direction(basis, angle)
  //
  // Direction in space represented as an absolute angle.
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

const proto = Direction.prototype

// proto.changeBasis =
proto.changeBasis = function (newBasis) {
  // tapspace.geometry.Direction:changeBasis(newBasis)
  //
  // Parameters:
  //   newBasis
  //
  // Return
  //   a Direction
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const tdir = dir2.transitFrom(this.r, tran)
  return new Direction(newBasis, tdir)
}

module.exports = Direction

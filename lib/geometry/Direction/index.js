const proj2 = require('affineplane').proj2

const Direction = function (basis, angle) {
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
  this.dir = angle
}

const proto = Direction.prototype

// proto.changeBasis =
proto.projectTo = function (newBasis) {
  const pr = this.basis.getProjectionTo(newBasis)
  const pdir = proj2.dir2(pr, this.dir)
  return new Direction(newBasis, pdir)
}

module.exports = Direction

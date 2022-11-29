const dir3 = require('affineplane').dir3

module.exports = function (newBasis) {
  // tapspace.geometry.Direction:changeBasis(newBasis)
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a Direction
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const tdir = dir3.transitFrom(this.dir, tran)
  const Direction = this.constructor
  return new Direction(newBasis, tdir)
}

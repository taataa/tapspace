const dir2 = require('affineplane').dir2

module.exports = function (newBasis) {
  // tapspace.geometry.Direction:changeBasis(newBasis)
  //
  // Parameters:
  //   newBasis
  //     a component
  //
  // Return
  //   a Direction
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const tdir = dir2.transitFrom(this.r, tran)
  const Direction = this.constructor
  return new Direction(newBasis, tdir)
}

const orient2 = require('affineplane').orient2

module.exports = function (newBasis) {
  // @Orientation:changeBasis(newBasis)
  //
  // Parameters:
  //   newBasis
  //     a BasisComponent
  //
  // Return
  //   an Orientation
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const orient = orient2.transitFrom(this.orient, tran)
  const Orientation = this.constructor
  return new Orientation(newBasis, orient)
}

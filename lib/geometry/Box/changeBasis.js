const box3 = require('affineplane').box3

module.exports = function (newBasis) {
  // @Box:changeBasis(newBasis)
  //
  // Transit the box to another basis. In other words, represent the same box
  // in the coordinate system of the given basis.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a Box
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const pb = box3.transitFrom(this.box, pr)
  const Box = this.constructor
  return new Box(newBasis, pb)
}

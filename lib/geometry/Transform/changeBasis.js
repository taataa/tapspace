const helm3 = require('affineplane').helm3

module.exports = function (newBasis) {
  // @Transform:changeBasis(newBasis)
  //
  // Represent the transform on another plane.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a Transform
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const h = helm3.transitFrom(this.helm, tran)
  const Transform = this.constructor
  return new Transform(newBasis, h)
}

const sphere3 = require('affineplane').sphere3

module.exports = function (newBasis) {
  // @Sphere:changeBasis(newBasis)
  //
  // Transit the sphere to another basis. In other words, represent the same
  // geometry in the coordinate system of the given basis.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a Sphere
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const pb = sphere3.transitFrom(this.sphere, pr)
  const Sphere = this.constructor
  return new Sphere(newBasis, pb)
}

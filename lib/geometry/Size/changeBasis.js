const size2 = require('affineplane').size2

module.exports = function (newBasis) {
  // @Size:changeBasis(newBasis)
  //
  // TODO This is impossible. Rotation cannot be applied to size.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a Size
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const ps = size2.transitFrom(this.size, pr)
  const Size = this.constructor
  return new Size(newBasis, ps)
}

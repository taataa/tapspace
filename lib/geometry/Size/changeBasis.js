const size3 = require('affineplane').size3

module.exports = function (newBasis) {
  // @Size:changeBasis(newBasis)
  //
  // The basis change of size does not preserve direction except
  // when the bases have same orientation. Rotation cannot be applied to size.
  //
  // Parameters:
  //   newBasis
  //     a BasisElement
  //
  // Return
  //   a Size
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const ps = size3.transitFrom(this.size, pr)
  const Size = this.constructor
  return new Size(newBasis, ps)
}

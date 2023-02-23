const scalar3 = require('affineplane').scalar3

module.exports = function (newBasis) {
  // @Volume:changeBasis(newBasis)
  //
  // The basis change of a volume changes the basis and represents
  // the same volume in the target basis.
  // Only change in scale affects the representation.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a Volume
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const pv = scalar3.transitFrom(this.volume, pr)
  const Volume = this.constructor
  return new Volume(newBasis, pv)
}

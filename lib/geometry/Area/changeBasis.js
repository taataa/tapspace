const scalar2 = require('affineplane').scalar2

module.exports = function (newBasis) {
  // @Area:changeBasis(newBasis)
  //
  // The basis change of area changes the basis and represents the same area
  // in the target basis. Only change in scale affects the representation.
  //
  // Parameters:
  //   newBasis
  //     a BasisElement
  //
  // Return
  //   an Area
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const pa = scalar2.transitFrom(this.area, pr)
  const Area = this.constructor
  return new Area(newBasis, pa)
}

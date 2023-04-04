const dist3 = require('affineplane').dist3

module.exports = function (basis) {
  // @Scale:transitRawOuter(basis)
  //
  // Represent the scale in the outer basis of the component.
  // Unlike changeBasis, returns a plain number without basis data.
  // See Point:transitRawOuter for details.
  //
  // Parameters:
  //   basis
  //     a BasisElement
  //
  // Return
  //   a number.
  //
  const tran = this.basis.getTransitionToParentOf(basis)
  return dist3.transitFrom(this.m, tran)
}

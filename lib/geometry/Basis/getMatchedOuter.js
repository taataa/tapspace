const plane3 = require('affineplane').plane3

module.exports = function (targetBasis) {
  // @Basis:getMatchedOuter(targetBasis)
  //
  // Get a basis that would represent the placement of the element basis,
  // if we transformed the element so that this basis and the target basis
  // match. Useful when you want to get a basis for a yet unpositioned element
  // and you know a basis relative to that element and you also know
  // where that basis should be space. Then the resulting basis is the basis
  // to which you should move the element.
  // See also Transformer:matchBasis
  //
  // Parameters:
  //   targetBasis
  //     a Basis
  //
  // Return
  //   a Basis
  //

  // this.tran is a coordinate transition from this basis to its element.
  // To get a transition from the element to the target basis, we invert.
  const itran = plane3.invert(this.tran)
  // To get a transition from the element to the target element, we combine.
  const tr = plane3.compose(targetBasis.tran, itran)

  const Basis = this.constructor
  return new Basis(targetBasis.basis, tr)
}

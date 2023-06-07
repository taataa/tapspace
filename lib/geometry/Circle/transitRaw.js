const circle3 = require('affineplane').circle3

module.exports = function (newBasis) {
  // @Circle:transitRaw(newBasis)
  //
  // Represent the circle in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a Component
  //
  // Return
  //   a circle3, an object.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return circle3.transitFrom(this.circle, tran)
}

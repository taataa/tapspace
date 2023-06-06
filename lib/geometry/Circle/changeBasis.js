const circle3 = require('affineplane').circle3

module.exports = function (newBasis) {
  // @Circle:changeBasis(newBasis)
  //
  // Transit the circle to another basis. In other words, represent the same
  // geometry in the coordinate system of the given basis.
  //
  // Parameters:
  //   newBasis
  //     a Component
  //
  // Return
  //   a Circle
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const pb = circle3.transitFrom(this.circle, pr)
  const Circle = this.constructor
  return new Circle(newBasis, pb)
}

const point3 = require('affineplane').point3

module.exports = function (newBasis) {
  // tapspace.geometry.Point:transitRaw(newBasis)
  //
  // Represent the point in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a component
  //
  // Return
  //   a point3, an object.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return point3.transitFrom(this.point, tran)
}

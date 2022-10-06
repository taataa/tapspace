const point3 = require('affineplane').point3

module.exports = function (newBasis) {
  // tapspace.geometry.Point:changeBasis(newBasis)
  //
  // Parameters:
  //   newBasis
  //     an affine component
  //
  // Return:
  //   a Point
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const xyz = point3.transitFrom(this.point, tran)
  const Point = this.constructor
  return new Point(newBasis, xyz)
}

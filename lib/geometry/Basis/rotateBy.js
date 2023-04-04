const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (radians, origin) {
  // @Basis:rotateBy(radians, origin)
  //
  // Rotate the basis around an origin point on xy-plane.
  //
  // Parameters:
  //   radians
  //     a number, the angle in rads
  //   origin
  //     a Point, the transform origin
  //
  // Return
  //   a Basis, the rotated basis
  //

  // Normalize
  if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const robasis = plane3.rotateBy(this.tran, origin, radians)

  const Box = this.constructor
  return new Box(this.basis, robasis)
}

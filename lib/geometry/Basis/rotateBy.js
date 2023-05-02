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
  //     optional Point, the transform origin. Defaults to the basis origin.
  //
  // Return
  //   a Basis, the rotated basis
  //

  // Normalize
  if (!origin) {
    origin = { x: this.tran.x, y: this.tran.y, z: this.tran.z }
  } else if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const robasis = plane3.rotateBy(this.tran, origin, radians)

  const Box = this.constructor
  return new Box(this.basis, robasis)
}

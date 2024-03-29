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

  // Detect invalid radians: NaN, string
  if (typeof radians !== 'number' || isNaN(radians)) {
    throw new Error('Invalid rotation angle: ' + radians)
  }

  // Normalize
  if (!origin) {
    origin = { x: this.tran.x, y: this.tran.y, z: this.tran.z }
  } else if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  if (typeof radians !== 'number') {
    throw new Error('Invalid rotation angle: ' + radians)
  }

  const robasis = plane3.rotateBy(this.tran, origin, radians)

  const Basis = this.constructor
  return new Basis(this.basis, robasis)
}

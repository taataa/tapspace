const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (multiplier, origin) {
  // @Basis:scaleBy(multiplier, origin)
  //
  // Scale the basis about an origin point.
  //
  // Parameters:
  //   multiplier
  //     a number, the scaling factor
  //   origin
  //     optional Point, the transform origin. Defaults to the basis origin.
  //
  // Return
  //   a Basis, the scaled basis
  //

  // Detect invalid multiplier: NaN, string, zero
  if (!multiplier || typeof multiplier !== 'number') {
    throw new Error('Invalid scale multiplier: ' + multiplier)
  }

  // Normalize
  if (!origin) {
    origin = { x: this.tran.x, y: this.tran.y, z: this.tran.z }
  } else if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const tran = plane3.scaleBy(this.tran, origin, multiplier)

  const Basis = this.constructor
  return new Basis(this.basis, tran)
}

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
  //     a Point, the transform origin
  //
  // Return
  //   a Basis, the scaled basis
  //

  // The origin needs to be transited into basis element
  // for the affineplane scaleBy to work.
  if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const tran = plane3.scaleBy(this.tran, origin, multiplier)

  const Basis = this.constructor
  return new Basis(this.basis, tran)
}

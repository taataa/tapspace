const dir3 = require('affineplane').dir3
const Direction = require('../../geometry/Direction')

module.exports = function (theta, phi) {
  // @Basis:createDirection(theta[, phi])
  //
  // Create a direction tensor from spherical coordinates using
  // the coordinate system of this basis.
  //
  // Parameters:
  //   theta
  //     a number, an angle in radians around the z-axis of the basis.
  //     .. Measured from the positive x-axis according to the right-hand rule.
  //   phi
  //     optional number, an angle in radians away from the z-axis of the basis.
  //     .. Default is π/2 that is perpendicular to the z-axis.
  //
  // Return
  //   a Direction
  //

  // Default
  if (typeof phi !== 'number') {
    phi = Math.PI / 2
  }
  // Build raw
  const dir = dir3.fromSpherical(theta, phi)
  // We need to represent the vector on the element basis.
  const dirb = dir3.transitFrom(dir, this.tran)
  // Build tensor
  return new Direction(this.basis, dirb)
}

const Direction = require('../../geometry/Direction')

module.exports = function (theta, phi) {
  // @Component:getDirection(theta[, phi])
  //
  // Create a Direction on this basis.
  //
  // Parameters
  //   theta
  //     a number, angle in radians relative to basis zero angle around z axis.
  //   phi
  //     optional number, default π/2.
  //     .. Angle in radians away from positive z axis.
  //
  // Return
  //   a Direction
  //

  // TODO rename to createDirection
  
  return Direction.fromSpherical(this, theta, phi)
}

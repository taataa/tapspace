const Direction = require('../../geometry/Direction')

module.exports = function (theta, phi) {
  // @Transformer:getDirection(theta[, phi])
  //
  // Get a direction from the spherical coordinate angles theta and phi
  // relative to the inner basis.
  //
  // Parameters:
  //   theta
  //     a number in radians. The angle from positive x-axis around
  //     .. z-axis according to the right-hand rule.
  //   phi
  //     optional number, default PI/2 (=90deg).
  //     .. The angle in radians from positive z-axis.
  //
  // Return:
  //   a Direction
  //
  if (typeof theta !== 'number') {
    throw new Error('Invalid theta angle')
  }
  if (typeof phi !== 'number') {
    phi = Math.PI / 2
  }

  return Direction.fromSpherical(this, theta, phi)
}

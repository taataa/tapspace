const Direction = require('../../geometry/Direction')

module.exports = function (theta, phi) {
  // @Component:getDirection(theta[, phi])
  //
  // Create a Direction from the spherical coordinate angles theta and phi
  // relative to the component.
  //
  // Parameters
  //   theta
  //     a number in radians. The angle from positive x-axis around
  //     .. z-axis according to the right-hand rule.
  //   phi
  //     optional number, default is π/2 (=90deg).
  //     .. The angle in radians away from the positive z axis.
  //
  // Return
  //   a Direction
  //

  // TODO rename to createDirection
  if (typeof theta !== 'number') {
    throw new Error('Invalid theta angle')
  }
  if (typeof phi !== 'number') {
    phi = Math.PI / 2
  }

  return Direction.fromSpherical(this, theta, phi)
}

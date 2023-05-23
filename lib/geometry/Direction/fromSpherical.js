const dir3 = require('affineplane').dir3

module.exports = (Direction) => {
  // Use factor pattern to avoid circular dependency.
  return function (basis, theta, phi) {
    // @Direction:fromSpherical(basis, theta, phi)
    //
    // Create a direction from [spherical coordinates](
    // https://en.wikipedia.org/wiki/Spherical_coordinate_system).
    //
    // Parameters:
    //   basis
    //     a Component
    //   theta
    //     a number, an angle in radians around z-axis of the basis,
    //     .. measured from positive x-axis according to the right-hand rule.
    //   phi
    //     a number, an angle in radians away from z-axis of the basis.
    //
    // Return
    //   a Direction
    //
    const dir = dir3.fromSpherical(theta, phi)
    return new Direction(basis, dir)
  }
}

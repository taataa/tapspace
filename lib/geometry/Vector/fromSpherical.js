const dir3 = require('affineplane').dir3

module.exports = (Vector) => {
  // Include Vector class this way to avoid circular dependencies.

  return (basis, magnitude, theta, phi) => {
    // @Vector.fromSpherical(basis, magnitude, theta, phi)
    //
    // Parameters:
    //   basis
    //     a Basis, the basis for the vector to return.
    //   magnitude
    //     a number, a distance on the basis. The length of the vector.
    //   theta
    //     a number, an angle in radians around z-axis of the basis,
    //     .. measured from positive x-axis according to the right-hand rule.
    //   phi
    //     a number, an angle in radians away from z-axis of the basis.
    //
    // Return
    //   a Vector, on the given basis.
    //

    // TODO use vec3.fromSpherical after fixed to use theta phi.
    const dir = dir3.fromSpherical(theta, phi)
    const vec = dir3.toVector(dir, magnitude)

    return new Vector(basis, vec)
  }
}

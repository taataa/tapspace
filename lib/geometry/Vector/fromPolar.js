const vec3 = require('affineplane').vec3

module.exports = (Vector) => {
  // Include Vector class this way to avoid circular dependencies.

  return (basis, radius, angle, depth) => {
    // @Vector.fromPolar(basis, radius, angle, depth)
    //
    // Create a vector from cylindrical polar coordinates.
    //
    // Parameters:
    //   basis
    //     a BasisElement, the basis for the vector to return.
    //   radius
    //     a number, a distance on the basis. The radial distance.
    //     .. Equals the length of the vector if the depth is zero.
    //   angle
    //     a number, the azimuth angle in radians around z-axis of the basis,
    //     .. measured from positive x-axis according to the right-hand rule.
    //   depth
    //     optional number, default 0. The z coordinate of the vector.
    //     .. Sometimes also called the height of the cylinder.
    //
    // Return
    //   a Vector, on the given basis.
    //

    const vec = vec3.fromPolar(radius, angle, depth)
    return new Vector(basis, vec)
  }
}

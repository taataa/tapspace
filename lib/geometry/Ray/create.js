const ray3 = require('affineplane').ray3

module.exports = (Ray) => {
  //
  return (basis, origin, span) => {
    // @Ray.create(basis, origin, span)
    //
    // Parameters:
    //   basis
    //     a Component, the basis for the ray
    //   origin
    //     a Point, the ray origin
    //   span
    //     a Vector, the ray direction
    //
    // Return
    //   a Ray, in the given basis.
    //

    // Normalize
    if (origin.transitRaw) {
      origin = origin.transitRaw(basis)
    }
    if (span.transitRaw) {
      span = span.transitRaw(basis)
    }

    const ray = ray3.create(origin, span)

    return new Ray(basis, ray)
  }
}

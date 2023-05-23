const point2 = require('affineplane').point2

module.exports = (Basis) => {
  // Avoid circular dependencies.

  return (basis, origin, unit) => {
    // @Basis.fromPoints(basis, origin, unit)
    //
    // Parameters:
    //   basis
    //     a Component, the basis component.
    //   origin
    //     a Point, the origin for the basis.
    //   unit
    //     a Point, at the tip of the x-axis unit vector.
    //
    // Return
    //   a Basis, on the given basis component.
    //

    // Normalize
    if (origin.transitRaw) {
      origin = origin.transitRaw(basis)
    }
    if (unit.transitRaw) {
      unit = unit.transitRaw(basis)
    }

    const vec = point2.diff(origin, unit)

    const b = {
      a: vec.x,
      b: vec.y,
      x: origin.x,
      y: origin.y,
      z: origin.z
    }
    return new Basis(basis, b)
  }
}

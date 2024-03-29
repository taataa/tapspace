const point3 = require('affineplane').point3

module.exports = (Vector) => {
  // Use factory pattern to control circular dependency.
  return function (p) {
    // @Point:getVectorTo(p)
    //
    // Get a vector from this to the point p.
    //
    // Parameters:
    //   p
    //     a Point
    //
    // Return:
    //   a Vector on this basis.
    //

    // Normalize to point3
    if (p.transitRaw) {
      p = p.transitRaw(this.basis)
    }

    const dv = point3.diff(this.point, p)
    return new Vector(this.basis, dv)
  }
}

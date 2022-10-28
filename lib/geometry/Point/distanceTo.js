const point3 = require('affineplane').point3

module.exports = (Distance) => {
  // Use factory pattern to control circular dependency.
  return function (p) {
    // tapspace.geometry.Point:distanceTo(p)
    //
    // Distance between points.
    //
    // Parameters:
    //   p
    //     a Point or {x,y,z}. The latter is assumed to be on the same basis.
    //
    // Return
    //   a Distance
    //

    // Normalize to point3
    if (p.changeBasis) {
      p = p.changeBasis(this.basis).point
    }

    const dist = point3.distance(this.point, p)

    return new Distance(this.basis, dist)
  }
}
const fine = require('affineplane')
const dir3 = fine.dir3
const point3 = fine.point3

module.exports = (Direction) => {
  // Use factory pattern to control circular dependency.
  return function (p) {
    // tapspace.geometry.Point:getDirectionTo(p)
    //
    // Direction from this point to another.
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

    const dir = dir3.fromVector(point3.diff(this.point, p))

    return new Direction(this.basis, dir)
  }
}

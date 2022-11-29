const fine = require('affineplane')
const dir3 = fine.dir3
const point3 = fine.point3

module.exports = function (distance, direction) {
  // @Point:polarOffset(distance, direction)
  //
  // Get the point at the given distance and direction.
  //
  // Parameters:
  //   distance
  //     accepts any of the following:
  //       a Distance
  //       a number, a distance measure in the basis of the point.
  //   direction
  //     accepts any of the following:
  //       a Direction, pointing to the desired direction.
  //       a Vector, pointing to the desired direction.
  //       a number, angle in radians around z-axis in the basis of the point.
  //
  // Return
  //   a Point
  //

  // Normalise distance to a measure on the basis.
  if (distance.transitRaw) {
    distance = distance.transitRaw(this.basis)
  }

  // Normalise direction to unit vector on the basis.
  if (direction.changeBasis) {
    direction = direction.changeBasis(this.basis)
    if (direction.dir) {
      // Is a Direction
      direction = direction.dir
    } else if (direction.vec) {
      // Is a Vector
      direction = dir3.fromVector(direction.vec)
    }
  } else {
    // Is a number, the theta angle.
    direction = dir3.fromSpherical(direction, Math.PI / 2)
  }

  const dx = distance * direction.x
  const dy = distance * direction.y
  const dz = distance * direction.z
  const po = point3.offset(this.point, dx, dy, dz)

  const Point = this.constructor
  return new Point(this.basis, po)
}

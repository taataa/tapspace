const fine = require('affineplane')
const dir3 = fine.dir3
const plane3 = fine.plane3

module.exports = function (distance, direction) {
  // @Basis:polarOffset(distance, direction)
  //
  // Get another basis translated by distance and direction.
  //
  // Parameters:
  //   distance
  //     accepts any of the following:
  //       a Distance
  //       a number, a distance measure on the basis element of the basis.
  //   direction
  //     accepts any of the following:
  //       a Direction, pointing to the desired direction.
  //       a Vector, pointing to the desired direction.
  //       a number, angle in radians around z-axis and relative
  //       .. to the positive x-axis of the basis element of the basis.
  //
  // Return
  //   a Basis
  //

  // Normalize
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

  const delta = {
    x: distance * direction.x,
    y: distance * direction.y,
    z: distance * direction.z
  }
  const po = plane3.translateBy(this.tran, delta)

  const Basis = this.constructor
  return new Basis(this.basis, po)
}

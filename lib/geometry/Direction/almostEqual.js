const vec3 = require('affineplane').vec3
// TODO use dir3

module.exports = function (dir, tolerance) {
  // @Direction:almostEqual(dir[, tolerance])
  //
  // Test if this direction is equal to a given direction within tolerance.
  // Equality requires strictly equal basis and that the distance between coordinates
  // is within the tolerance.
  //
  // Parameters:
  //   dir
  //     a Direction
  //   tolerance
  //     optional number
  //
  // Return
  //   a boolean
  //

  if (dir && dir.basis && this.basis === dir.basis) {
    return vec3.almostEqual(this.dir, dir.dir, tolerance)
  }

  return false
}

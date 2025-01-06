const vec3 = require('affineplane').vec3

module.exports = function (dir) {
  // @Direction:equal(dir)
  //
  // Test if this direction is strictly equal to a given direction.
  // Strict equality requires strictly equal basis and coordinates.
  //
  // Parameters:
  //   dir
  //     a Direction
  //
  // Return
  //   a boolean
  //

  if (dir && dir.basis && this.basis === dir.basis) {
    return vec3.equal(this.dir, dir.dir)
  }

  return false
}

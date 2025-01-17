const orient2 = require('affineplane').orient2

module.exports = function (orient) {
  // @Orientation:equal(orient)
  //
  // Test if this orientation is strictly equal to a given orientation.
  // Strict equality requires identical basis and orientation values.
  //
  // Parameters:
  //   orient
  //     an Orientation
  //
  // Return
  //   a boolean
  //

  if (orient && orient.basis && this.basis === orient.basis) {
    return orient2.equal(this.orient, orient.orient)
  }

  return false
}

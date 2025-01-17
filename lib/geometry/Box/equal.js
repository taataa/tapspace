const box3 = require('affineplane').box3
const equal = box3.equal

module.exports = function (b) {
  // @Box:equal(b)
  //
  // Test if this box is strictly equal with the given box b.
  // Strict equality requires that the boxes are on the same basis
  // and have strictly equal size, position, and orientation.
  //
  // Parameters:
  //   b
  //     a Box
  //
  // Return
  //   a boolean
  //
  if (!b || !b.basis) {
    return false
  }

  return this.basis === b.basis && equal(this.box, b.box)
}

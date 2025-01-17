const plane3 = require('affineplane').plane3
const equal = plane3.equal

module.exports = function (b) {
  // @Basis:equal(b)
  //
  // Test if the value b is a Basis and strictly equal.
  // Strict equality requires the same basis' basis
  // and identical coordinates.
  //
  // Parameters:
  //   b
  //     a Basis
  //
  // Return
  //   a boolean
  //
  if (!b || !b.basis) {
    return false
  }

  return this.basis === b.basis && equal(this.tran, b.tran)
}

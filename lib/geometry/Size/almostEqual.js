const size3 = require('affineplane').size3

module.exports = function (s, tolerance) {
  // @Size:almostEqual(s[, tolerance])
  //
  // Test if this size is equal to the given size s within tolerance.
  // Equality requires strictly equal basis and that the difference in size
  // is within the tolerance.
  //
  // Parameters:
  //   s
  //     a Size
  //   tolerance
  //     optional number
  //
  // Return
  //   a boolean
  //

  if (s && s.basis && this.basis === s.basis) {
    return size3.almostEqual(this.size, s.size, tolerance)
  }

  return false
}

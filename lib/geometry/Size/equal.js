const size3 = require('affineplane').size3

module.exports = function (s) {
  // @Size:equal(s)
  //
  // Test if this size is strictly equal to the given size s.
  // Strict equality requires identical basis and size properties.
  // Additional properties are allowed.
  //
  // Parameters:
  //   s
  //     a Size
  //
  // Return
  //   a boolean
  //

  if (s && s.basis && this.basis === s.basis) {
    return size3.equal(this.size, s.size)
  }

  return false
}

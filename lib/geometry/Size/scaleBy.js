const size3 = require('affineplane').size3

module.exports = function (multiplier) {
  // @Size:scaleBy(multiplier)
  //
  // Multiply the size.
  //
  // Parameters:
  //   multiplier
  //     a number
  //
  // Return
  //   a Size
  //
  const ms = size3.scaleBy(this.size, multiplier)
  const Size = this.constructor
  return new Size(this.basis, ms)
}

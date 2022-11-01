const size2 = require('affineplane').size2

module.exports = function (multiplier) {
  // tapspace.geometry.Size:scaleBy(multiplier)
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
  const ms = size2.scaleBy(this.size, multiplier)
  const Size = this.constructor
  return new Size(this.basis, ms)
}

const Size = require('../Size')

module.exports = function () {
  // @Circle:getSize()
  //
  // Get circle dimensions.
  //
  // Return
  //   a Size
  //

  const d = this.circle.r * 2
  return new Size(this.basis, {
    w: d,
    h: d,
    d: 0
  })
}

const Size = require('../Size')

module.exports = function () {
  // @Sphere:getSize()
  //
  // Get sphere dimensions.
  //
  // Return
  //   a Size
  //
  const d = this.sphere.r * 2
  return new Size(this.basis, { w: d, h: d, d })
}

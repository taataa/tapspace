const Size = require('../../geometry/Size')

module.exports = function () {
  // Get component size dimensions in pixels.
  //
  // Return
  //   a Size
  //
  return new Size(this, this.size.w, this.size.h)
}

const Size = require('../../geometry/Size')

module.exports = function () {
  // @Frame:getSize()
  //
  // Get frame size dimensions in pixels.
  //
  // Return
  //   a Size
  //
  return new Size(this, {
    w: this.size.w,
    h: this.size.h,
    d: 0
  })
}

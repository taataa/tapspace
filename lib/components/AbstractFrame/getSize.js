const Size = require('../../geometry/Size')

module.exports = function () {
  // @Frame:getSize()
  //
  // Get frame size dimensions in pixels.
  //
  // Return
  //   a Size
  //
  return new Size(this, this.size)
}

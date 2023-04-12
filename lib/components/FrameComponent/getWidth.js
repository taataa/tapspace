const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @FrameComponent:getWidth()
  //
  // Get frame width as a Distance.
  //
  // Return
  //   a Distance
  //
  return new Distance(this, this.size.w)
}

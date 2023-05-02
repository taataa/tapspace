const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @Viewport:getWidth()
  //
  // Get viewport width as a Distance.
  //
  // Return
  //   a Distance
  //
  return new Distance(this, this.element.offsetWidth)
}

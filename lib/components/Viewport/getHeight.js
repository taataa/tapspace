const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @Viewport:getHeight()
  //
  // Get viewport height as a Distance.
  //
  // Return
  //   a Distance
  //
  return new Distance(this, this.element.offsetHeight)
}

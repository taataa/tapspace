const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @Frame:getHeight()
  //
  // Get frame height as a Distance.
  //
  // Return
  //   a Distance
  //
  return new Distance(this, this.size.h)
}

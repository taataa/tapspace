const Distance = require('../../geometry/Distance')

module.exports = function () {
  // tapspace.components.AbstractFrame:getHeight()
  //
  // Get component height as a Distance.
  //
  // Return
  //   a Distance
  //
  return new Distance(this, this.size.h)
}

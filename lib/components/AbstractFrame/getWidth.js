const Distance = require('../../geometry/Distance')

module.exports = function () {
  // tapspace.components.AbstractFrame:getWidth()
  //
  // Get component width as a Distance.
  //
  // Return
  //   a Distance
  //
  return new Distance(this, this.size.w)
}

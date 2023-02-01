const Distance = require('../Distance')

module.exports = function () {
  // @Box:getDepth()
  //
  // Get box depth as a distance.
  //
  // Return
  //   a Distance
  //

  return new Distance(this, this.box.d)
}

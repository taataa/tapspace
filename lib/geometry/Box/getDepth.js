const Distance = require('../Distance')

module.exports = function () {
  // @Box:getDepth()
  //
  // Get box depth as a distance.
  //
  // Return
  //   a Distance
  //

  return new Distance(this.basis, this.box.d)
}

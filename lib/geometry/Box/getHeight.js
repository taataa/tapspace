const Distance = require('../Distance')

module.exports = function () {
  // @Box:getHeight()
  //
  // Get box height as a distance.
  //
  // Return
  //   a Distance
  //

  return new Distance(this, this.box.h)
}

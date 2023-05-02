const Distance = require('../Distance')

module.exports = function () {
  // @Box:getWidth()
  //
  // Get box width as a distance.
  //
  // Return
  //   a Distance
  //

  return new Distance(this.basis, this.box.w)
}

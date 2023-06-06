const Distance = require('../Distance')

module.exports = function () {
  // @Circle:getRadius()
  //
  // Get radius as a distance.
  //
  // Return
  //   a Distance
  //
  return new Distance(this.basis, this.circle.r)
}

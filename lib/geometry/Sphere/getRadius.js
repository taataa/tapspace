const Distance = require('../Distance')

module.exports = function () {
  // @Sphere:getRadius()
  //
  // Get sphere radius as a distance.
  //
  // Return
  //   a Distance
  //
  return new Distance(this.basis, this.sphere.r)
}

const Distance = require('../Distance')

module.exports = function () {
  // @Sphere:getDiameter()
  // @Sphere:getDepth
  // @Sphere:getHeight
  // @Sphere:getWidth
  //
  // Get sphere diameter as a distance. The diameter equals the sphere
  // width, height, and depth.
  //
  // Return
  //   a Distance
  //

  return new Distance(this.basis, this.sphere.r * 2)
}

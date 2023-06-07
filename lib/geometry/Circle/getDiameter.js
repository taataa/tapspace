const Distance = require('../Distance')

module.exports = function () {
  // @Circle:getDiameter()
  // @Circle:getHeight
  // @Circle:getWidth
  //
  // Get circle diameter as a distance. The diameter equals the circle
  // width, height, and depth.
  //
  // Return
  //   a Distance
  //

  return new Distance(this.basis, this.circle.r * 2)
}

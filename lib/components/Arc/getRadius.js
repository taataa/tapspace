const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @Arc:getRadius()
  //
  // Get the arc radius. The smaller the sector angle, the bigger the radius.
  //
  // Return
  //   a Distance
  //

  const width = this.size.w
  const angle = this.angle

  const radius = width / (2 * Math.sin(angle / 2))

  return new Distance(this, radius)
}

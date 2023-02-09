const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @Arc:getLength()
  //
  // Compute arc length.
  //
  // Return
  //   a Distance
  //

  // Begin with radius
  const width = this.size.w
  const angle = this.angle
  const radius = width / (2 * Math.sin(angle / 2))
  // Convert to circumference
  //   const circum = 2 * Math.PI * radius
  // Take angle's share of the circumference
  //   const arclen = circum * angle / (2 * Math.PI)
  // Simplify:
  const arclen = radius * angle

  return new Distance(this, arclen)
}

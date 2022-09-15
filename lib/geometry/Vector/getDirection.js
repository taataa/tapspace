const Direction = require('../Direction')

module.exports = function () {
  // tapspace.geometry.Vector:getDirection()
  //
  // Get vector direction on xy-plane.
  //
  // Return
  //   a Direction
  //
  const angle = Math.atan2(this.y, this.x)
  return new Direction(this.basis, angle)
}

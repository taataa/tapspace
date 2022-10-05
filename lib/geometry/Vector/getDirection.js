const Direction = require('../Direction')

module.exports = function () {
  // tapspace.geometry.Vector:getDirection()
  //
  // Get vector direction.
  //
  // Return
  //   a Direction
  //
  return Direction.createFromVector(this.basis, this)
}

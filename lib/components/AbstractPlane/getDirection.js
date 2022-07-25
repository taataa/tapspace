const Direction = require('../../geometry/Direction')

module.exports = function () {
  // tapspace.components.AbstractPlane:getDirection()
  //
  // The direction of the plane. This equals to the angle of the positive
  // x-axis of the plane. The Direction makes it easy to represent the angle
  // on different planes.
  //
  // Return
  //   a Direction
  //
  return new Direction(this, 0)
}

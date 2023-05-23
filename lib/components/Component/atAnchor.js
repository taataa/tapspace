const Point = require('../../geometry/Point')

module.exports = function () {
  // @Component:atAnchor()
  //
  // Get origin point. At zero by default.
  //
  // Return
  //   a Point
  //

  return new Point(this, { x: 0, y: 0, z: 0 })
}

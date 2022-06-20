const Point = require('../../geometry/Point')

module.exports = function (rx, ry) {
  // Get point by relative coordinates.
  //
  // Parameters:
  //   rx
  //     number. 0 at left edge, 1 at right edge.
  //   ry
  //     number. 0 at top edge, 1 at bottom edge.
  //
  // Return
  //   Point on the element
  //
  const s = this.getSize() // TODO avoid fn call.
  return new Point(this, rx * s.w, ry * s.h)
}

const Point = require('../../geometry/Point')

module.exports = function (rx, ry) {
  // Get a Point by relative coordinates, rounded to nearest integers.
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
  const w = this.element.offsetWidth
  const h = this.element.offsetHeight
  return new Point(this, Math.round(rx * w), Math.round(ry * h))
}

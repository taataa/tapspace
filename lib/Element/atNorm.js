const Point = require('../Point')

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
  const w = this.el.offsetWidth
  const h = this.el.offsetHeight
  return new Point(this.el, rx * w, ry * h)
}

const Point = require('../../geometry/Point')

module.exports = function (rx, ry, rz) {
  // @Viewport:atNorm(rx, ry[, rz])
  //
  // Get a Point by relative coordinates.
  //
  // Parameters:
  //   rx
  //     number. 0 at left edge, 1 at right edge.
  //   ry
  //     number. 0 at top edge, 1 at bottom edge.
  //   rz
  //     optional number. 0 at projection image plane, 1 at height depth.
  //
  // Return
  //   a Point on the element
  //

  const w = this.element.offsetWidth
  const h = this.element.offsetHeight

  const x = rx * w
  const y = ry * h

  let z = 0
  if (rz && typeof rz === 'number') {
    z = rz * h
  }

  return new Point(this, { x, y, z })
}

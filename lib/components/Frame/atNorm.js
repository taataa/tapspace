const Point = require('../../geometry/Point')

module.exports = function (rx, ry, rz) {
  // @Frame:atNorm(rx, ry[, rz])
  //
  // Get a point from unit coordinates that map the element width and height.
  //
  // Parameters:
  //   rx
  //     number. 0 at left edge, 1 at right edge.
  //   ry
  //     number. 0 at top edge, 1 at bottom edge.
  //   rz
  //     optional number. 0 at frame plane, 1 at height depth.
  ///    Maybe rz=1 at sqrt(width * height) depth?
  //
  // Return
  //   a Point on the element
  //

  const s = this.size
  const x = rx * s.w
  const y = ry * s.h

  let z = 0
  if (rz && typeof rz === 'number') {
    z = rz * s.h
  }

  return new Point(this, { x, y, z })
}

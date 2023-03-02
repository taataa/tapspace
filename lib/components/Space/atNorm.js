const Point = require('../../geometry/Point')

module.exports = function (rx, ry, rz) {
  // @Space:atNorm(rx, ry[, rz])
  // @Space:getNormalizedPoint
  //
  // Get a point from normalized coordinates in the space bounding box.
  // If the space is empty, returns the space origin at (0, 0, 0).
  //
  // Parameters:
  //   rx
  //     number. 0 at left edge, 1 at right edge.
  //   ry
  //     number. 0 at top edge, 1 at bottom edge.
  //   rz
  //     optional number. 0 at front face depth, 1 at back face depth.
  //
  // Return
  //   a Point
  //
  const bounds = this.getBoundingBox()
  return bounds.atNorm(rx, ry, rz)
}

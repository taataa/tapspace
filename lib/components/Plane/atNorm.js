module.exports = function (rx, ry) {
  // @Space:atNorm(rx, ry)
  // @Space:getNormalizedPoint
  //
  // Get a point from normalized coordinates in the space bounding box.
  // If the space is empty, returns the space origin at (0, 0).
  //
  // Parameters:
  //   rx
  //     number. 0 at left edge, 1 at right edge.
  //   ry
  //     number. 0 at top edge, 1 at bottom edge.
  //
  // Return
  //   a Point
  //
  const bounds = this.getBoundingBox()
  return bounds.atNorm(rx, ry)
}

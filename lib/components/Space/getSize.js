module.exports = function (rx, ry, rz) {
  // @Space:getSize()
  //
  // Get the size of the bounding box of the space content.
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
  return bounds.getSize()
}

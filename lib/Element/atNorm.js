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
  //   point2 on the element
  //
  const w = this.el.offsetWidth
  const h = this.el.offsetHeight
  return {
    basis: this.el, // defines coordinate system
    x: rx * w,
    y: ry * h
  }
}

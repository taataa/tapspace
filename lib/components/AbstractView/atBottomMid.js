module.exports = function () {
  // tapspace.components.AbstractView:atBottomMid()
  //
  // Get point at the middle of the bottom edge of the viewport.
  //
  // Return
  //   a Point
  //
  return this.atNorm(0.5, 1)
}

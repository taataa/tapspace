module.exports = function () {
  // tapspace.components.AbstractView:atMidLeft()
  //
  // Get point at the middle of the left edge of the viewport.
  //
  // Return
  //   a Point
  //
  return this.atNorm(0, 0.5)
}

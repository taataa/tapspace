module.exports = function () {
  // tapspace.components.AbstractView:atMidRight()
  //
  // Get point at the middle of the right edge of the viewport.
  //
  // Return
  //   a Point
  //
  return this.atNorm(1, 0.5)
}

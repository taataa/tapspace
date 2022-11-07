module.exports = function () {
  // tapspace.components.AbstractView:atBottomLeft()
  //
  // Get point at the bottom left corner of the viewport.
  //
  // Return
  //   a Point
  //
  return this.atNorm(0, 1)
}

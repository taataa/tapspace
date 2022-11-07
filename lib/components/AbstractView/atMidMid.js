module.exports = function () {
  // tapspace.components.AbstractView:atMid()
  // tapspace.components.AbstractView:atMidMid()
  // tapspace.components.AbstractView:atCenter()
  //
  // Get point at the middle the viewport.
  //
  // Return
  //   a Point
  //
  return this.atNorm(0.5, 0.5)
}

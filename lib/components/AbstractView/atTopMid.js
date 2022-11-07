module.exports = function () {
  // tapspace.components.AbstractView:atTopMid()
  //
  // Get point at the middle of the top edge of the viewport.
  //
  // Return
  //   a Point
  //
  return this.atNorm(0.5, 0)
}

module.exports = function () {
  // tapspace.components.AbstractFrame:atMid()
  // tapspace.components.AbstractFrame:atMidMid()
  // tapspace.components.AbstractFrame:atCenter()
  //
  // Get point at the middle the element.
  //
  // Return
  //   point2 on the element
  //
  return this.atNorm(0.5, 0.5)
}

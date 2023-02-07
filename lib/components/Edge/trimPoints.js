module.exports = function (startPoint, endPoint, trimDistance) {
  // @Edge:trimPoints(startPoint, endPoint, trimDistance)
  //
  // Set edge points but trim a distance from each end.
  // Useful for drawing edges between round-shaped nodes.
  // Note that this does not scale the edge but
  // translates, resizes and orients it.
  //
  // Parameters:
  //   startPoint
  //     a Point
  //   endPoint
  //     a Point
  //   trimDistance
  //     a Distance
  //
  // Return
  //   this, for chaining
  //

  const trimDirection = startPoint.getVectorTo(endPoint)
  const p0 = startPoint.polarOffset(trimDistance, trimDirection)
  const p1 = endPoint.polarOffset(trimDistance, trimDirection.negate())

  this.setPoints(p0, p1)

  return this
}

module.exports = function (startPoint, endPoint, trimStart, trimEnd) {
  // @Edge:trimPoints(startPoint, endPoint, trimStart[, trimEnd])
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
  //   trimStart
  //     a Distance. The edge will begin this much after the start point.
  //   trimEnd
  //     optional Distance. The edge will end this much before the end point.
  //     .. If omitted, defaults to the trimStart value, thus making
  //     .. the trim symmetric.
  //
  // Return
  //   this, for chaining
  //

  if (!trimEnd) {
    trimEnd = trimStart
  }

  const trimDirection = startPoint.getVectorTo(endPoint)
  const p0 = startPoint.polarOffset(trimStart, trimDirection)
  const p1 = endPoint.polarOffset(trimEnd, trimDirection.negate())

  this.setPoints(p0, p1)

  return this
}

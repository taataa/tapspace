module.exports = function () {
  // @Edge:getLength()
  //
  // Get length of the edge in local pixels.
  //
  // Return
  //   a number, pixels on the edge plane.
  //
  const p0 = this.at(this.startPoint)
  const p1 = this.at(this.endPoint)
  const dist = p0.getDistanceTo(p1)
  return dist.getNumber()
}

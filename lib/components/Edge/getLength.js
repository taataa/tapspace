module.exports = function () {
  // @Edge:getLength()
  //
  // Get length of the edge.
  //
  // Return
  //   a Distance
  //
  const p0 = this.at(this.startpoint)
  const p1 = this.at(this.endpoint)
  const dist = p0.getDistanceTo(p1)
  return dist
}

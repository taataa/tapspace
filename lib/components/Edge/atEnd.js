module.exports = function () {
  // @Edge:atEnd()
  //
  // Get the Point at the edge ending, at the middle of the border.
  //
  // Return: a Point
  //
  return this.at(
    this.endpoint.x,
    this.width / 2
  )
}

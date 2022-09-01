module.exports = function () {
  // tapspace.Edge:atEnd()
  //
  // Get the Point at the edge ending, at the middle of the border.
  //
  // Return: a Point
  //
  return this.atNorm(1, 0.5)
}

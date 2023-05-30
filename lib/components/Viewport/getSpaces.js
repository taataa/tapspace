module.exports = function () {
  // @Viewport:getSpaces()
  //
  // Get spaces attached to the viewport.
  // In other words, get all children of the viewport hyperspace.
  //
  // Return
  //   array of Component
  //
  return this.hyperspace.getChildren()
}

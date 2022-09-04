module.exports = function () {
  // tapspace.components.AbstractView:isPerspective()
  //
  // Check if the viewport projection mode is perspective.
  //
  // Return
  //   boolean
  //
  return this.cameraDistance > 0
}

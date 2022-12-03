module.exports = function () {
  // @Space:getViewport()
  // @Space:getView()
  //
  // Get the viewport that is associated with the space.
  // This is the main way for users to access the viewport
  // after initializing the space.
  //
  // Example:
  // ```
  // const space = tapspace.createSpace('#space')
  // const view = space.getViewport()
  // ```
  //
  // Return
  //   a Viewport
  //
  return this.view
}

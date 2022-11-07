const Viewport = require('../Viewport')

module.exports = function (element) {
  // tapspace.create(element)
  // tapspace.components.Space:create
  //
  // Convert element into a zoomable space.
  //
  // Parameters
  //   element
  //     a HTMLElement or query string. The element will become
  //     .. the main container for viewport, space, and space contents.
  //
  // Return
  //   a tapspace.components.Space
  //
  // Usage:
  // ```
  // const space = tapspace.create('#space')
  // ```
  //

  // Create a viewport and return its space component.
  // Viewport is the true root under the hood but it is
  // probably easier for users to think space as the main
  // container and the viewport its logical child.
  const view = new Viewport(element)
  return view.space
}

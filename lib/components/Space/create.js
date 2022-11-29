const Viewport = require('../Viewport')

module.exports = function (element) {
  // tapspace.create(element)
  // tapspace.createSpace
  //
  // Convert element into a zoomable space.
  //
  // Parameters
  //   element
  //     a HTMLElement or query string. The element will become
  //     .. the main container for viewport, space, and space contents.
  //
  // Return
  //   a Space
  //
  // Usage:
  // ```
  // const space = tapspace.create('#space')
  // ```
  //

  if (typeof element === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    element = document.querySelector(element)
  }

  // Create a viewport and return its space component.
  // Viewport is the true root under the hood but it is
  // probably easier for users to think space as the main
  // container and the viewport its logical child.
  const view = new Viewport(element)

  return view.space
}

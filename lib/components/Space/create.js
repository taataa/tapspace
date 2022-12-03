const Viewport = require('../Viewport')

module.exports = function (element) {
  // tapspace.createSpace(element)
  // @Space.create
  //
  // Elevate an element into a zoomable space.
  //
  // Example:
  // ```
  // const space = tapspace.createSpace('#space')
  // ```
  //
  // Parameters
  //   element
  //     an HTMLElement or query string. The element will become
  //     .. the main container for viewport, space, and space contents.
  //
  // Return
  //   a Space
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

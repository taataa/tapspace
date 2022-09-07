const Viewport = require('../Viewport')

module.exports = function (element, options) {
  // tapspace.create(element, options)
  // tapspace.components.Space:create
  //
  // Convert element into a zoomable space.
  //
  // Parameters
  //   element
  //     HTMLElement or query string
  //   options
  //     an optional object with properties:
  //       size
  //         a { width, height }
  //
  // Return
  //   a tapspace.components.Space
  //

  // Create a viewport and return its space component.
  // Viewport is the true root under the hood but it is
  // probably easier for users to think space as the main
  // container and the viewport its logical child.
  const view = new Viewport(element, options)
  return view.space
}

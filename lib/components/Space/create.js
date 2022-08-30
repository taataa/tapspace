const Viewport = require('../Viewport')

module.exports = function (element, options) {
  // tapspace.create(element, options)
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
  const view = new Viewport(element, options)
  return view.space
}

const AffineElement = require('./index')

module.exports = (content) => {
  // tapspace.createElement(content)
  // tapspace.element
  //
  // Make element an affine component. Wraps the content inside
  // an affine div.
  //
  // Parameters:
  //   content
  //     a HTMLElement or HTML string. The given element(s) will be
  //     ..wrapped in a div.
  //
  // Return
  //   a tapspace.components.Component
  //
  return new AffineElement(content)
}

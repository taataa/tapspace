const AffineElement = require('../Element')

module.exports = function (content, position) {
  // tapspace.components.Plane.add(content, position)
  //
  // Add HTML element on the plane.
  //
  // Parameters:
  //   content
  //     a HTMLElement, HTML string, or AffineElement
  //   position
  //     various, see AbstractPlane.addChild
  //
  // Return
  //   an AffineElement
  //

  // Detect affine element
  let comp
  if (typeof content === 'object') {
    if (content.nodeType) {
      // Content is HTMLElement
      if (content.affine) {
        // Content is HTMLElement and already affine
        comp = content.affine
      } else {
        // Content is non-affine HTMLElement
        comp = new AffineElement(content)
      }
    } else if (content.element && content.tran) {
      // Content is affine component
      comp = content
    } else {
      throw new Error('Invalid content type.')
    }
  } else {
    // Assume content is html string
    comp = new AffineElement(content)
  }

  this.addChild(comp, position)

  return comp
}

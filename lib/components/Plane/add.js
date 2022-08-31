const AffineElement = require('../Element')

module.exports = function (content, placement, options) {
  // tapspace.components.Plane.add(content, position)
  //
  // Add HTML element on the plane.
  //
  // Parameters:
  //   content
  //     a HTMLElement or HTML string
  //   placement
  //     various, see AbstractPlane.addChild
  //   options
  //     optional object with optional properties:
  //       size
  //
  // Return
  //   an AffineElement
  //
  const aelem = new AffineElement(content, options)
  this.addChild(aelem, placement)

  return aelem
}

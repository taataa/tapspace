// Layer
//
// Aliases: Space, Plane, Layer, Group
// Space does not have size.
//
const AffineElement = require('../Element')
const Transform

const AffineLayer = function (el) {
  this.el = el
}

const proto = AffineLayer.prototype
module.exports = AffineLayer

proto.addElementAt = function (element, placement) {
  // Add an existing element into the space.
  //
  // Parameters:
  //   element
  //     HTMLElement
  //   placement
  //     position
  //       Point on the space
  //     gravity
  //       Point on the element
  //     rotation
  //       number, radians
  //     scale
  //       number, multiplier
  //     size
  //       Size
  //
  // Return
  //   AffineElement
  //

  const ael = new AffineElement(element)

  // TODO create and set transformation

  this.el.appendChild(element)

  return ael
}

proto.createElementAt = function (placement) {
  // Create a div and add it to the space.
  //
  // Parameters:
  //   placement
  //     position
  //       Point on the space
  //     gravity
  //       Point on the element
  //     rotation
  //       number, radians
  //     scale
  //       number, multiplier
  //     size
  //       Size
  //
  // Return
  //   AffineElement
  //
}

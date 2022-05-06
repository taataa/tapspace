// AffineLayer
// Inherits AffineElement
//
// Aliases: Space, Plane, Layer, Group
// Space does not have size.
//
const AffineElement = require('../Element')
const Transform = require('../../geometry/Transform')

const AffineLayer = function () {
  const elem = document.createElement('div')
  elem.className = 'affine-layer'

  AffineElement.call(this, elem)
}

const proto = Object.assign({}, AffineElement.prototype)
AffineLayer.prototype = proto
module.exports = AffineLayer

proto.add = function (component, placement) {
  // Add a component onto the layer.
  //
  // Parameters:
  //   component
  //     a Element, Text, Group, Image
  //   placement
  //     position
  //       { x, y } on the parent or a Point
  //     gravity
  //       { x, y } on the element
  //     rotation
  //       number, radians
  //     scale
  //       number, multiplier
  //     size
  //       { width, height } or a Size
  //
  // Return
  //   this, for chaining
  //

  // TODO create and set transformation

  this.el.appendChild(component.el)

  return this
}

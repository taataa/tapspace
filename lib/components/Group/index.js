// AffineGroup
// Inherits AffineElement
//
// Set of other AffineElements.
// Group element has zero width and height.
//
const AffineElement = require('../Element')
const Transform = require('../../geometry/Transform')
const tran2 = require('affineplane').tran2

const AffineLayer = function () {
  const elem = document.createElement('div')
  elem.className = 'affine-group'
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
  //       { x, y } on the group or a Point.
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

  // Insert to DOM
  this.el.appendChild(component.el)

  // Create transformation
  const r = placement.rotation
  const s = placement.scale
  const tx = placement.position.x - component.gravity.x
  const ty = placement.position.y - component.gravity.y
  const proj = tran2.fromPolar(s, r, tx, ty)

  // Set child projection
  component.proj = proj

  return this
}

const tran2 = require('affineplane').tran2
const defaultPlacement = require('./defaultPlacement')

module.exports = function (component, placement) {
  // Add a component onto this plane.
  //
  // Parameters:
  //   component
  //     an AbstractPlane
  //   placement
  //     position
  //       { x, y } on this plane or a Point. Default {x:0,y:0}
  //     rotation
  //       number, radians. Optional. Default 0.
  //     scale
  //       number, multiplier. Optional. Default 1.
  //
  // Return
  //   this, for chaining
  //

  // Handle default placement
  if (!placement) {
    placement = {}
  }
  placement = Object.assign({}, defaultPlacement, placement)

  // Insert to DOM
  this.element.appendChild(component.element)

  // Create transformation
  const r = placement.rotation
  const s = placement.scale
  const tx = placement.position.x - component.gravity.x
  const ty = placement.position.y - component.gravity.y
  const proj = tran2.fromPolar(s, r, tx, ty)

  // Set child projection
  component.proj = proj

  // TODO emit event so that the view can update CSS of the component.
  // We cannot update CSS directly because the viewport might be
  // perspective and requires component to be rendered slightly differently.

  return this
}

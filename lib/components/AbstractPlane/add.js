module.exports = function (component, placement) {
  // tapspace.components.AbstractPlane:add(component, placement)
  //
  // Place a component onto this plane.
  //
  // Parameters:
  //   component
  //     an AbstractPlane
  //   placement
  //     an optional object with the following properties:
  //       anchor
  //         {x,y,z} relative to the component left-top corner or a Point
  //         .. A custom anchor point on the component to move to the position.
  //         .. Default at the component anchor.
  //       position
  //         {x,y,z} relative to the plane origin or a Point.
  //         .. Place the component so that its anchor goes to this position.
  //         .. Default at the plane anchor.
  //       rotation
  //         a number, radians. Optional. Default 0.
  //       scale
  //         a number, multiplier. Optional. Default 1.
  //       preserve
  //         a boolean. Optional. Default false. Set true to place
  //         ..the component according to its current and possibly
  //         ..intentionally prepared projection instead of the default
  //         ..placement behavior. When preserve is set true,
  //         ..the default or given values of position, rotation, and scale
  //         ..will be ignored.
  //
  // Return
  //   this, for chaining
  //

  // Handle default parameters.
  if (!placement) {
    placement = {}
  }
  placement = Object.assign({
    rotation: 0,
    scale: 1,
    preserve: false
  }, placement)

  // Compute the projection.
  if (!placement.preserve) {
    // Normalize custom anchor
    const anchor = component.atAnchor(placement.anchor)
    // Normalize target position here, the soon-to-be parent.
    // The component is not yet connected. Thus feed plain {x,y} to moveTo.
    const pos = this.atAnchor(placement.position).plain()

    // TODO Normalize rotation direction
    const r = placement.rotation
    // TODO Normalize scale
    const s = placement.scale

    component.moveTo(pos, r, s, anchor)
  }

  // Insert to DOM
  this.element.appendChild(component.element)

  return this
}

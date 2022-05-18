const geom = require('affineplane')

module.exports = function (component, placement) {
  // Place a component onto this plane.
  //
  // Parameters:
  //   component
  //     an AbstractPlane
  //   placement
  //     an optional object with the following properties:
  //       position
  //         { x, y } on this plane or a Point. Default at the plane anchor.
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
    position: this.anchor,
    rotation: 0,
    scale: 1,
    preserve: false,
  }, placement)

  // Compute the projection.
  if (!placement.preserve) {
    // Normalize position
    let pos = placement.position
    if (pos.basis) {
      const pr = pos.basis.getProjectionTo(this)
      pos = geom.proj2.point2(pr, pos)
    }

    // TODO Normalize rotation direction
    const r = placement.rotation
    // TODO Normalize scale
    const s = placement.scale

    component.moveTo(pos, r, s)
  }

  // Insert to DOM
  this.element.appendChild(component.element)

  return this
}

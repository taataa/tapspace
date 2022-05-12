const geom = require('affineplane')

const defaultPlacement = {
  position: { x: 0, y: 0 },
  rotation: 0,
  scale: 1
}

module.exports = function (component, placement) {
  // Place a component onto this plane. If the placement omitted,
  // the component will be placed according to its current projection.
  //
  // Parameters:
  //   component
  //     an AbstractPlane
  //   placement
  //     an optional object with the following properties:
  //       position
  //         { x, y } on this plane or a Point. Default {x:0,y:0}
  //       rotation
  //         number, radians. Optional. Default 0.
  //       scale
  //         number, multiplier. Optional. Default 1.
  //
  // Return
  //   this, for chaining
  //

  // If no placement was given, we use the component projection directly.
  if (placement) {
    // Handle default placement.
    placement = Object.assign({}, defaultPlacement, placement)

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

    // Compute the projection.
    // We need to find the position of the component origin on this plane.
    // First find the linear transformation.
    const a = s * Math.cos(r)
    const b = s * Math.sin(r)
    // The component.anchor is a vector from component origin to anchor.
    const canx = component.anchor.x
    const cany = component.anchor.y
    // Let us represent the vector on parent. The linear transf. is for that.
    const panx = a * canx - b * cany
    const pany = b * canx + a * cany
    // The component origin on this plane is the position vec minus anchor vec.
    const pcox = pos.x - panx
    const pcoy = pos.y - pany
    // Now we have everything to form the projection.
    component.proj = { a: a, b: b, x: pcox, y: pcoy }
  }

  // Insert to DOM
  this.element.appendChild(component.element)

  // TODO emit event so that the view can update CSS of the component.
  // We cannot update CSS directly because the viewport might be
  // perspective and requires component to be rendered slightly differently.

  return this
}

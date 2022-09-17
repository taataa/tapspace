const geom = require('affineplane')

module.exports = function (component, position) {
  // tapspace.components.AbstractPlane:addChild(component, position)
  //
  // Place a component onto this plane.
  //
  // Parameters:
  //   component
  //     an AbstractPlane
  //   position
  //     optional Point or {x,y} or {x,y,z}.
  //     Defines the initial position for the component.
  //     You can leave the position parameter undefined and move
  //     .. the component to its position afterwards.
  //     Also, if you have already prepared the local coordinates
  //     .. of the component and want to preserve them as is,
  //     .. then leave the position parameter undefined.
  //
  // Return
  //   this, for chaining
  //

  if (position) {
    // Assume the component.tran is identity.
    // Thus anchor is implicitly transited here already.
    const anc = component.anchor

    if (position.changeBasis) {
      // Assume position is a Point.
      // Transit the point here.
      const pos = position.changeBasis(this)
      // Prepare component placement
      component.tran = {
        a: 1,
        b: 0,
        x: pos.x - anc.x,
        y: pos.y - anc.y,
        z: pos.z
      }
    } else if (geom.plane3.validate(position)) {
      // If position is a plain plane3 transition, then use as is
      // and disregard anchor.
      component.tran = geom.plane3.copy(position)
    } else if (geom.point2.validate(position)) {
      // If position is a plain point2 or point3 then assume it
      // is already represented on this plane.
      const pos = position
      // Prepare component placement
      component.tran = {
        a: 1,
        b: 0,
        x: pos.x - anc.x,
        y: pos.y - anc.y,
        z: typeof pos.z === 'number' ? pos.z : 0
      }
    } else {
      // Unknown position
      throw new Error('Invalid position object.')
    }
  }

  // Insert to DOM
  this.element.appendChild(component.element)

  // Render css tranform to visually place the component.
  component.renderTransform()

  return this
}

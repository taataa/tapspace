const fine = require('affineplane')
const plane3 = fine.plane3
const point2 = fine.point2

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
      const pos = position.changeBasis(this).point
      // Prepare component placement
      component.tran = {
        a: 1,
        b: 0,
        x: pos.x - anc.x,
        y: pos.y - anc.y,
        z: pos.z - anc.z
      }
    } else if (plane3.validate(position)) {
      // If position is a plain plane3 transition, then use as is
      // and disregard anchor.
      component.tran = plane3.copy(position)
    } else if (point2.validate(position)) {
      // If position is a plain point2 or point3 then assume it
      // is already represented on this plane.
      const pos = position
      // Prepare component placement
      component.tran = {
        a: 1,
        b: 0,
        x: pos.x - anc.x,
        y: pos.y - anc.y,
        // If is point2, assume z=0
        z: typeof pos.z === 'number' ? pos.z - anc.z : 0
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

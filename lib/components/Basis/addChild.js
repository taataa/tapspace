const fine = require('affineplane')
const point2 = fine.point2

module.exports = function (component, position) {
  // @Basis:addChild(component, position)
  // @Basis:add
  //
  // Place a component onto this basis.
  //
  // Parameters:
  //   component
  //     a Basis
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
    // Normalize position to point3
    let pos
    if (position.transitRaw) {
      pos = position.transitRaw(this)
    } else if (point2.validate(position)) {
      pos = position
      if (typeof position.z !== 'number') {
        pos.z = 0
      }
    } else {
      throw new Error('Invalid position object.')
    }

    // Assume the component.tran is identity.
    // Thus anchor is implicitly transited here already.
    const anc = component.anchor

    component.tran = {
      a: 1,
      b: 0,
      x: pos.x - anc.x,
      y: pos.y - anc.y,
      z: pos.z - anc.z
    }
  }

  // Insert to DOM
  this.element.appendChild(component.element)

  // Render css tranform to visually place the component.
  component.renderTransform()

  return this
}

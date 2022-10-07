const geom = require('affineplane')

module.exports = function (position, orientation, scale) {
  // tapspace.components.AbstractPlane:moveTo(position, orientation, scale)
  //
  // Set the placement of the component on the parent.
  // This moves the component anchor to the given position
  // and rotates and scales the component as specified.
  //
  // Parameters:
  //   position
  //     a point { x, y } on the parent or a Point. Required.
  //     ..The component will be moved on the parent so that
  //     ..the anchor of the component matches the position.
  //   orientation
  //     a number or a Direction. Optional. Default 0.
  //     ..If a number, it is radians relative to the parent orientation.
  //   scale
  //     a number or a Scale. Optional. Default 1.
  //     ..If a number, it is a multiplier relative to the parent scale.
  //
  // Return
  //   this, for chaining
  //

  if (typeof rotation === 'undefined') { rotation = 0 }
  if (typeof scale === 'undefined') { scale = 1 }

  // Normalize the position onto the parent.
  let pos = position
  if (position.basis) {
    // The parent might be virtual.
    // Therefore we first transit here and then to the possible virtual parent.
    const tran = position.basis.getTransitionToParentOf(this)
    pos = geom.point3.transitFrom(position.point, tran) // pos becomes {x,y}
  }

  // Normalize rotation direction
  let r = rotation
  if (rotation.basis) {
    const tran = rotation.basis.getTransitionToParentOf(this)
    r = geom.dir3.transitFrom(rotation.r, tran) // becomes number
  }

  // Normalize scale
  let s = scale
  if (scale.basis) {
    const tran = scale.basis.getTransitionToParentOf(this)
    s = geom.dist3.transitFrom(scale.s, tran) // becomes number
  }

  // Normalize the anchor to point3.
  const anc = this.atAnchor().point

  // Compute the transition.
  // We need to find the position of the component {x:0,y:0} on this plane.
  // First find the linear transformation.
  const a = s * Math.cos(r)
  const b = s * Math.sin(r)
  // Interpret the anchor point as a vector from self {x:0,y:0} to the anchor.
  // Let us represent the vector on the parent.
  // Because translation does not affect vectors,
  // we can simply use the linear transformation.
  //   const pancx = a * ancx - b * ancy
  //   const pancy = b * ancx + a * ancy
  const panc = geom.vec3.transitFrom(anc, this.tran)
  // The component {x:0,y:0,z:0} on the parent equals the parent {x:0,y:0,z:0}
  // plus the position vec minus the anchor vec.
  const px = pos.x - panc.x
  const py = pos.y - panc.y
  const pz = pos.z - panc.z

  // Now we have everything to form the transition.
  this.tran = { a: a, b: b, x: px, y: py, z: pz }

  this.renderTransform()

  return this
}

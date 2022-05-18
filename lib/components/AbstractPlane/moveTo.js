const geom = require('affineplane')

module.exports = function (position, rotation, scale) {
  // Set the placement of the component on the parent.
  // This moves the component anchor to the given position
  // and rotates and scales the component as specified.
  //
  // Parameters:
  //   position
  //     a point { x, y } on the parent or a Point.
  //     ..The component will be moved on the parent so that
  //     ..the anchor of the component matches the position.
  //   rotation
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
    // Therefore we first project here and then to the possible virtual parent.
    const prh = position.basis.getProjectionTo(this)
    const pr = geom.proj2.compose(this.proj, prh)
    pos = geom.proj2.point2(pr, position) // becomes plain {x,y}
  }

  // Normalize rotation direction
  let r = rotation
  if (rotation.basis) {
    const prh = rotation.basis.getProjectionTo(this)
    const pr = geom.proj2.compose(this.proj, prh)
    r = geom.proj2.dir2(pr, rotation.r) // becomes number
  }

  // Normalize scale
  let s = scale
  if (scale.basis) {
    const prh = scale.basis.getProjectionTo(this)
    const pr = geom.proj2.compose(this.proj, prh)
    s = geom.proj2.dist2(pr, scale.scale) // becomes number
  }

  // Compute the projection.
  // We need to find the position of the component {x:0,y:0} on this plane.
  // First find the linear transformation.
  const a = s * Math.cos(r)
  const b = s * Math.sin(r)
  // Interpret the anchor point as a vector from self {x:0,y:0} to the anchor.
  const ancx = this.anchor.x
  const ancy = this.anchor.y
  // Let us represent the vector on the parent.
  // Because translation does not affect vectors,
  // we can simply use the linear transformation.
  const pancx = a * ancx - b * ancy
  const pancy = b * ancx + a * ancy
  // The component {x:0,y:0} on the parent equals the parent {x:0,y:0}
  // plus the position vec minus the anchor vec.
  const px = pos.x - pancx
  const py = pos.y - pancy

  // Now we have everything to form the projection.
  this.proj = { a: a, b: b, x: px, y: py }

  this.renderCss()

  return this
}

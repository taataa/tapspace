module.exports = function (position, rotation, scale) {
  // Set the placement of the component on the parent.
  // This moves the component anchor to the given position
  // and rotates and scales the component as specified.
  //
  // Parameters:
  //   position
  //     a point { x, y } on the parent. The component will be moved so
  //     ..that its anchor matches the position.
  //   rotation
  //     a number, radians relative to the parent orientation.
  //   scale
  //     a number, multiplier relative to the parent scale.
  //
  // Return
  //   this, for chaining
  //

  // TODO Normalize the position on the parent
  const pos = position
  // TODO Normalize rotation direction
  const r = rotation
  // TODO Normalize scale
  const s = scale

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

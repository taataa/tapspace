module.exports = function (angle, center) {
  // tapspace.components.AbstractView:rotateBy(angle, center)
  //
  // Rotate the viewport in space around anchor.
  //
  // Parameters
  //   angle
  //     a number, the delta angle to rotate the viewport.
  //   center
  //     optional Point. Scaling is performed about this point.
  //     ..Defaults to the viewport anchor.
  //
  // Return
  //   this, for chaining
  //

  // Normalize the anchor point onto the viewport.
  center = this.atAnchor(center)

  // Rotate each plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].rotateBy(angle, center)
  }

  return this
}

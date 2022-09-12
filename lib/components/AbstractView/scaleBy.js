module.exports = function (factor, center) {
  // tapspace.components.AbstractView:scaleBy(factor, center)
  //
  // Translate the viewport in space along x and y axis.
  //
  // Parameters
  //   factor
  //     a number
  //   center
  //     an optional Point. Scaling is performed about this point.
  //     ..Defaults to the viewport anchor.
  //
  // Return
  //   this, for chaining
  //

  // Normalize the anchor point onto the viewport.
  center = this.atAnchor(center)

  // Scale each plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].scaleBy(factor, center)
  }

  return this
}

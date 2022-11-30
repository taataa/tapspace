module.exports = function (angle, pivot) {
  // @Viewport:rotateBy(angle, pivot)
  //
  // Rotate the viewport in space around a pivot point.
  //
  // Parameters
  //   angle
  //     a number, the delta angle to rotate the viewport.
  //   pivot
  //     optional Point. Scaling is performed about this point.
  //     ..Defaults to the viewport anchor.
  //
  // Return
  //   this, for chaining
  //

  // Normalize the pivot onto the viewport.
  pivot = this.atAnchor(pivot)

  // Rotate each plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].rotateBy(angle, pivot)
  }

  return this
}

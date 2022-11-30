module.exports = function (factor, pivot) {
  // @Viewport:scaleBy(factor, pivot)
  //
  // Scale the viewport in space about a pivot point.
  //
  // Parameters
  //   factor
  //     a number
  //   pivot
  //     optional Point. Scaling is performed about this point.
  //     ..Defaults to the viewport anchor.
  //
  // Return
  //   this, for chaining
  //

  // Normalize the pivot onto the viewport.
  pivot = this.atAnchor(pivot)

  // Scale each plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].scaleBy(factor, pivot)
  }

  return this
}

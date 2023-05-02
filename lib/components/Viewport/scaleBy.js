module.exports = function (factor, pivot) {
  // @Viewport:scaleBy(factor, pivot)
  //
  // Scale the viewport in space about a pivot point.
  // For example, the scaling by the factor of 2 doubles the viewport size
  // and therefore makes the objects in space visually shrink to half.
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

  // View scale the viewport, not the space.
  if (factor === 0) {
    throw new Error('Invalid scale factor. It must be non-zero.')
    // TODO or just return without scaling, to embrace robustness?
  }
  const ifactor = 1 / factor

  // Scale each basis space.
  const spaces = this.hyperspace.getChildren()
  for (let i = 0; i < spaces.length; i += 1) {
    spaces[i].scaleBy(ifactor, pivot)
  }

  return this
}

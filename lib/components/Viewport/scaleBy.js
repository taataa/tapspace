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

  if (factor === 0) {
    throw new Error('Invalid scale factor. It must be non-zero.')
    // TODO or just return without scaling, to embrace robustness?
  }

  // Normalize the pivot onto the viewport.
  pivot = this.atAnchor(pivot)

  // Virtually, we scale viewport in space, not the space itself.
  // However, we cannot actually scale the viewport element
  // but we can imitate it by scaling the hyperspace invertedly.
  const ifactor = 1 / factor
  this.hyperspace.scaleBy(ifactor, pivot)

  return this
}

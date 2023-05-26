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
  // However, we cannot actually scale the viewport, but spaces.
  const ifactor = 1 / factor

  // Detect and handle singular inversion errors.
  try {
    // Scale each basis space.
    const spaces = this.hyperspace.getChildren()
    for (let i = 0; i < spaces.length; i += 1) {
      spaces[i].scaleBy(ifactor, pivot)
    }
  } catch (err) {
    if (err.message.startsWith('Singular')) {
      console.warn('Singular space transformation detected. '
        + 'Prevent rendering of nano-scale elements. '
        + 'Use Tapspace.js loaders and measuring methods to detect '
        + 'and remove them gracefully.')
    } else {
      throw err
    }
  }

  return this
}

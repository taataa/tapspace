module.exports = function () {
  // @Basis:getSpace()
  //
  // Find the affine viewport this basis currently belongs to, if any.
  // Will return null if the basis is not connected to a space.
  //
  // Return
  //   a Space or null
  //

  const candidate = this.getRoot()

  // Duck typing
  if (candidate.atCamera) {
    // Is viewport
    return candidate.getSpace()
  }

  if (candidate.getViewport) {
    // Is space
    return candidate
  }

  return null
}

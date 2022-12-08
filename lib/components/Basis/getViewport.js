module.exports = function () {
  // @Basis:getViewport()
  //
  // Get the affine viewport this basis currently belongs to, if any.
  // Will return null if the basis is not connected to a viewport.
  //
  // Return
  //   a Viewport
  //

  const candidate = this.getRoot()

  // Duck typing
  if (candidate.atCamera) {
    return candidate
  }

  return null
}

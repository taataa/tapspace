module.exports = function () {
  // @BasisElement:getViewport()
  //
  // Get the affine viewport this basis currently belongs to, if any.
  // Will return null if the basis is not connected to a viewport.
  //
  // Return
  //   a Viewport
  //
  // Complexity
  //   O(d) where d is the depth of the affine tree.
  //

  const candidate = this.getRoot()

  // Duck typing
  if (candidate.atCamera) {
    return candidate
  }

  return null
}

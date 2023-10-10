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

  // Virtually, we rotate the viewport in space, not the space itself.
  // However, we cannot actually rotate the viewport element
  // but we can imitate it by rotating the hyperspace invertedly.
  this.hyperspace.rotateBy(-angle, pivot)

  return this
}

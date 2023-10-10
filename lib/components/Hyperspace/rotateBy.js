const fine = require('affineplane')

module.exports = function (radians, pivot) {
  // @Hyperspace:rotateBy(radians, pivot)
  //
  // Rotate the hyperspace with respect to the viewport.
  //
  // Parameters:
  //   radians
  //     a number, delta angle to rotate.
  //   pivot
  //     a Point. Rotation is performed around this point.
  //
  // Return
  //   this, for chaining
  //

  // Normalize the origin.
  if (pivot.transitRaw) {
    pivot = pivot.transitRaw(this)
  }

  // The anchor needs to be transited onto the parent, as expected by
  // the affineplane rotateBy.
  const anchorOnParent = fine.point3.transitFrom(pivot, this.tran)
  // Rotate the transition image
  const newPlane = fine.plane3.rotateBy(this.tran, anchorOnParent, radians)
  // Update transition matrix
  this.tran = newPlane
  // Update css transform
  this.renderTransform()
  // Emit viewport idle after transforms
  this.viewport.requestIdle()

  return this
}

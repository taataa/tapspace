const fine = require('affineplane')

module.exports = function (radians, pivot) {
  // @Transformer:rotateBy(radians[, pivot])
  //
  // Rotate the basis around z axis.
  //
  // Parameters:
  //   radians
  //     a number, delta angle to rotate.
  //   pivot
  //     optional Point. Rotation is performed around this point.
  //     .. Defaults to the plane anchor.
  //
  // Return
  //   this, for chaining
  //

  // Detect invalid radians: NaN, string
  if (typeof radians !== 'number' || isNaN(radians)) {
    throw new Error('Invalid rotation angle: ' + radians)
  }

  // Normalize the anchor point.
  const anchor = this.atAnchor(pivot)

  // The anchor needs to be transited onto the parent, as expected by
  // the affineplane rotateBy.
  const anchorOnParent = fine.point3.transitFrom(anchor.point, this.tran)
  // Rotate the transition image
  const newPlane = fine.plane3.rotateBy(this.tran, anchorOnParent, radians)
  // Update transition matrix
  this.tran = newPlane
  // Update css transform
  this.renderTransform()

  return this
}

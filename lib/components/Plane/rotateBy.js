const fine = require('affineplane')

module.exports = function (radians, pivot) {
  // @Plane:rotateBy(radians, pivot)
  //
  // Rotate the element.
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

  // Normalize the anchor point.
  const anchor = this.atAnchor(pivot)

  // The anchor needs to be transited onto the parent, as expected by
  // the affineplane rotateBy.
  const anchorOnParent = fine.point3.transitFrom(anchor.point, this.tran)
  // Scale the transition image
  const newPlane = fine.plane3.rotateBy(this.tran, anchorOnParent, radians)
  // Update transition matrix
  this.tran = newPlane
  // Update css transform
  this.renderTransform()

  return this
}

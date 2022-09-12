// TODO drop rotateBy, promote createTransform instead.
const geom = require('affineplane')

module.exports = function (radians, center) {
  // tapspace.components.AbstractPlane:rotateBy(radians, center)
  //
  // Rotate the element.
  //
  // Parameters:
  //   radians
  //     a number, delta angle to rotate.
  //   center
  //     optional Point. Rotation is performed around this point.
  //     .. Defaults to the plane anchor.
  //
  // Return
  //   this, for chaining
  //

  // Normalize the anchor point.
  const anchor = this.atAnchor(center)

  // The anchor needs to be transited onto the parent, as expected by
  // the affineplane rotateBy.
  const anchorOnParent = geom.point3.transitFrom(anchor, this.tran)
  // Scale the transition image
  const newPlane = geom.plane3.rotateBy(this.tran, anchorOnParent, radians)
  // Update transition matrix
  this.tran = newPlane
  // Update css transform
  this.renderTransform()

  return this
}

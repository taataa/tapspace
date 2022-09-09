// TODO drop rotateBy, promote createTransform instead.
const geom = require('affineplane')

module.exports = function (radians, opts) {
  // tapspace.components.AbstractPlane:rotateBy(radians, opts)
  //
  // Rotate the element.
  //
  // Parameters:
  //   radians
  //     a number, delta angle to rotate.
  //   opts
  //     anchor
  //       an optional Point. Rotation is performed around this point.
  //       . Defaults to the plane anchor.
  //
  // Return
  //   this, for chaining
  //

  if (!opts) {
    opts = {}
  }

  // Normalize the anchor point.
  const anchor = this.atAnchor(opts.anchor)

  // TODO normalise direction

  // The anchor needs to be transited onto the parent, as expected by
  // the affineplane rotateBy.
  const anchorOnParent = geom.point3.transitFrom(anchor, this.tran)
  // Scale the transition image
  const newPlane = geom.plane3.rotateBy(this.tran, anchorOnParent, radians)
  // Update transition matrix
  this.tran = newPlane
  // Update css transform
  this.renderTransform(opts)

  return this
}

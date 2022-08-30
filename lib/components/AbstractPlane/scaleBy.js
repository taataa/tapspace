const geom = require('affineplane')

module.exports = function (multiplier, opts) {
  // tapspace.components.AbstractPlane:scaleBy(multiplier, opts)
  //
  // Scale the element.
  //
  // Parameters:
  //   multiplier
  //     a number, the scale multiplier.
  //   opts
  //     anchor
  //       an optional Point. Scaling is performed about this point.
  //       ..Defaults to the plane anchor.
  //
  // Return
  //   this, for chaining
  //

  if (!opts) {
    opts = {}
  }

  // Normalize the anchor point.
  const center = this.atAnchor(opts.anchor)

  // The anchor needs to be transited onto parent for affineplane scaleBy
  const centerOnParent = geom.point3.transitFrom(center, this.plane)
  // Scale the transition image
  const newPlane = geom.plane3.scaleBy(this.plane, centerOnParent, multiplier)
  // Update transition matrix
  this.plane = newPlane
  // Update css
  this.renderTransform(opts)

  return this
}

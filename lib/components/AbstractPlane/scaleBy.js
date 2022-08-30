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
  const centerOnParent = geom.point3.transitFrom(center, this.tran)
  // Scale the transition image
  const newTran = geom.plane3.scaleBy(this.tran, centerOnParent, multiplier)
  // Update transition matrix
  this.tran = newTran
  // Update css
  this.renderTransform(opts)

  return this
}

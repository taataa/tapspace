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

  // The anchor needs to be projected onto parent for affineplane scaleBy
  const centerOnParent = geom.point2.transitFrom(center, this.plane)
  // Scale the projection image
  const newPlane = geom.plane2.scaleBy(this.plane, centerOnParent, multiplier)
  // Update projection matrix
  this.plane = newPlane
  // Update css
  this.renderTransform(opts)

  return this
}

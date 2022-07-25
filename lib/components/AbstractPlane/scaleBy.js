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
  const centerOnParent = geom.proj2.point2(this.proj, center)
  // Scale the projection image
  const newProj = geom.tran2.scaleBy(this.proj, centerOnParent, multiplier)
  // Update projection matrix
  this.proj = newProj
  // Update css
  this.renderTransform(opts)

  return this
}

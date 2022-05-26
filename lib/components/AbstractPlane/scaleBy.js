// TODO drop rotateBy, promote createTransform instead.
const geom = require('affineplane')

module.exports = function (multiplier, opts) {
  // Scale the element.
  //
  // Parameters:
  //   multiplier
  //     a number, the scale multiplier.
  //   opts
  //     anchor
  //       an optional Point. Scaling is performed about this point.
  //       ..Defaults to the plane anchor.
  //     animation params TODO
  //
  // Return
  //   this, for chaining
  //

  if (!opts) {
    opts = {}
  }

  // DEBUG console.log('scaleBy opts.anchor', opts.anchor)
  // DEBUG console.log('scaleBy this.proj', this.proj)

  // Normalize the anchor point.
  let center
  if (opts.anchor) {
    // Use custom anchor
    if (opts.anchor.basis) {
      // Normalize
      const pr = opts.anchor.basis.getProjectionTo(this)
      center = geom.proj2.point2(pr, opts.anchor) // becomes plain {x,y}
    } else {
      // Assume on the element.
      center = opts.anchor
    }
  } else {
    // Otherwise use the plane anchor
    center = this.anchor
  }

  // The anchor needs to be projected onto parent for affineplane scaleBy
  const centerOnParent = geom.proj2.point2(this.proj, center)
  // Scale the projection image
  const newProj = geom.tran2.scaleBy(this.proj, centerOnParent, multiplier)
  // Update projection matrix
  this.proj = newProj
  // Update css
  this.renderCss(opts)

  return this
}

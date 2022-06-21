// TODO drop rotateBy, promote createTransform instead.
const geom = require('affineplane')

module.exports = function (radians, opts) {
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

  // The anchor needs to be projected onto the parent, as expected by
  // the affineplane rotateBy.
  const anchorOnParent = geom.proj2.point2(this.proj, anchor)
  // Scale the projection image
  const newProj = geom.tran2.rotateBy(this.proj, anchorOnParent, radians)
  // Update projection matrix
  this.proj = newProj
  // Update css transform
  this.renderCss(opts) // TODO rename renderTransform

  return this
}

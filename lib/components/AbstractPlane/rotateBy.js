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
  //       ..Defaults to the plane anchor.
  //     animation params TODO
  //
  // Return
  //   this, for chaining
  //

  if (!opts) {
    opts = {}
  }

  // Normalize the anchor point.
  const center = this.atAnchor(opts.anchor)

  // TODO normalise direction

  // The anchor needs to be projected onto parent for affineplane scaleBy
  const centerOnParent = geom.proj2.point2(this.proj, center)
  // Scale the projection image
  const newProj = geom.tran2.rotateBy(this.proj, centerOnParent, radians)
  // Update projection matrix
  this.proj = newProj
  // Update css
  this.renderCss(opts)

  return this
}

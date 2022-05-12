// TODO drop rotateBy, promote createTransform instead.
const geom = require('affineplane')

module.exports = (multiplier, opts) => {
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

  // Normalize the anchor point.
  let center
  if (opts.anchor) {
    if (opts.anchor.basis) {
      const pr = opts.anchor.basis.getProjectionTo(this)
      center = geom.proj2.point2(pr, opts.anchor) // becomes plain {x,y}
    }
  } else {
    // Use default anchor
    center = this.anchor
  }

  const newProj = geom.tran2.scaleBy(this.proj, center, multiplier)
  this.proj = newProj

  // TODO view updates CSS transform

  return this
}

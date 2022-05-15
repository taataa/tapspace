// TODO drop rotateBy, promote createTransform instead.
const geom = require('affineplane')

module.exports = function (center, radians, opts) {
  // Rotate the element.
  //
  // Parameters:
  //   center
  //     a Point, the center of rotation.
  //   radians
  //     a number, angle to rotate.
  //   opts
  //     animation params TODO
  //
  // Return
  //   this, for chaining
  //

  // Project the center onto the element.
  if (center.basis) {
    const pr = center.basis.getProjectionTo(this)
    center = geom.proj2.point2(pr, center) // becomes plain {x,y}
  }

  const newProj = geom.tran2.rotateBy(this.proj, center, radians)
  this.proj = newProj

  this.renderCss(opts)

  return this
}

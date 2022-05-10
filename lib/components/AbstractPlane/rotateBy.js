// TODO drop rotateBy, promote createTransform instead.
const geom = require('affineplane')
const projectionBetween = require('../../dom/projectionBetween')
const applyTransform = require('../../dom/applyTransform')

module.exports = (center, radians, opts) => {
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
    const pr = projectionBetween(center.basis, this.element)
    center = geom.proj2.point2(pr, center) // becomes plain {x,y}
  }

  const newProj = geom.tran2.rotateBy(this.proj, center, radians)
  this.proj = newProj

  applyTransform(this.el, this.proj)

  return this
}

const proj2 = require('affineplane').proj2
const applyTransformOrigin = require('./utils/applyTransformOrigin')

module.exports = function (point) {
  // Set the anchor point of the plane. This does not move the plane.
  //
  // Parameters:
  //   point
  //     a point2 on the plane or a Point in its space. The new anchor point.
  //
  // Return
  //   this, for chaining
  //

  // Normalise onto the plane
  if (point.basis) {
    const pr = point.basis.getProjectionTo(this)
    point = proj2.point2(pr, point) // becomes point2
  }

  this.anchor = {
    x: point.x,
    y: point.y
  }

  // The transform-origin follows the anchor.
  // See render for further notes on why.
  applyTransformOrigin(this.element, this.anchor)

  return this
}
